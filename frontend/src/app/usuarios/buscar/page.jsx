"use client";

import Link from "next/link";
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BorrarUsuario from "@/components/borrar";
import Cargando from "@/components/loading";

export default function BuscarUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const nombre = searchParams.get('nombre');

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true);
            const url = `http://localhost:3000/usuarios/searchUsuarioPorName/${nombre}`;
            const response = await axios.get(url);
            setUsuarios(response.data);
            setLoading(false);
        };

        if (nombre) {
            fetchUsuarios();
        }
    }, [nombre]);

    return (
        <>
            <h1>Buscar Usuario</h1>
            {loading ? (
                <Cargando />
            ) : usuarios.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.usuario}</td>
                                <td>
                                    <Link href={`/usuarios/modificar/${usuario.id}`} className="btn btn-warning me-2">Modificar</Link>
                                    <BorrarUsuario id={usuario.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-warning" role="alert">
                    Usuario no encontrado.
                </div>
            )}
        </>
    );
}
