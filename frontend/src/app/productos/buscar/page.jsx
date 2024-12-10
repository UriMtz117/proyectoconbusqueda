"use client";

import Link from "next/link";
import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BorrarProducto from "@/components/borrarProducto";
import Cargando from "@/components/loading";

export default function BuscarProducto() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const nombre = searchParams.get('nombre');

    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            const url = `http://localhost:3000/productos/buscarProductoPorName/${nombre}`;
            const response = await axios.get(url);
            setProductos(response.data);
            setLoading(false);
        };

        if (nombre) {
            fetchProductos();
        }
    }, [nombre]);

    return (
        <>
            <h1>Buscar Producto</h1>
            {loading ? (
                <Cargando />
            ) : productos.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.precio}</td>
                                <td>
                                    <Link href={`/productos/modificar/${producto.id}`} className="btn btn-warning me-2">
                                        Modificar
                                    </Link>
                                    <BorrarProducto id={producto.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-warning" role="alert">
                    Producto no encontrado.
                </div>
            )}
        </>
    );
}
