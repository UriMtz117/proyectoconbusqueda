"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

export default function NavBar() {
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (pathname.includes('/usuarios')) {
            router.push(`/usuarios/buscar?nombre=${searchQuery}`);
        } else if (pathname.includes('/productos')) {
            router.push(`/productos/buscar?nombre=${searchQuery}`);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 1) {
            const fetchSuggestions = async () => {
                let url = '';
                if (pathname.includes('/usuarios')) {
                    url = `http://localhost:3000/usuarios/buscarUsuarioPorNombre/${searchQuery}`;
                } else if (pathname.includes('/productos')) {
                    url = `http://localhost:3000/productos/buscarProductoPorNombre/${searchQuery}`;
                }
                const response = await axios.get(url);
                setSuggestions(response.data);
            };

            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        setSearchQuery('');
    }, [pathname]);

    const getSuggestionValue = (suggestion) => suggestion.nombre;
    const renderSuggestion = (suggestion) => (
        <div className="suggestion-item">
            {suggestion.nombre}
        </div>
    );

    const onSuggestionsFetchRequested = ({ value }) => {
        setSearchQuery(value);
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        if (pathname.includes('/usuarios')) {
            router.push(`/usuarios/buscar?nombre=${suggestion.nombre}`);
        } else if (pathname.includes('/productos')) {
            router.push(`/productos/buscar?nombre=${suggestion.nombre}`);
        }
    };

    const inputProps = {
        placeholder: 'Search',
        value: searchQuery,
        onChange: (e, { newValue }) => setSearchQuery(newValue),
        className: 'form-control me-2'
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/blog">Blog</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Usuarios
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/usuarios/mostrar">Mostrar Usuarios</Link></li>
                                    <li><Link className="dropdown-item" href="/usuarios/nuevo">Nuevo Usuario</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Productos
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/productos/mostrar">Mostrar Productos</Link></li>
                                    <li><Link className="dropdown-item" href="/productos/nuevo">Nuevo Producto</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Ventas
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/ventas/mostrar">Mostrar Ventas</Link></li>
                                    <li><Link className="dropdown-item" href="/ventas/nuevo">Nueva Venta</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={handleSearch}>
                            <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={onSuggestionsClearRequested}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                onSuggestionSelected={onSuggestionSelected}
                                inputProps={inputProps}
                                theme={{
                                    input: 'form-control me-2',
                                    suggestionsContainerOpen: 'dropdown-menu show',
                                    suggestionsList: 'list-unstyled',
                                    suggestion: 'dropdown-item',
                                    suggestionHighlighted: 'active'
                                }}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <style jsx>{`
                .suggestion-item {
                    padding: 8px 16px;
                    cursor: pointer;
                }
                .suggestion-item:hover {
                    background-color: #f8f9fa;
                }
                .dropdown-menu {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 0.25rem;
                }
            `}</style>
        </>
    );
}
