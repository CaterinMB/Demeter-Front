import React, { useState } from "react";
import Box from "@mui/material/Box";

function DeleteUser({ onClose, onDelete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-3xl font-semibold ">Eliminar Usuario</h1>
        <p className="deleteText">
          {/* ¿Está seguro de que deseas eliminar este empleado? */}
        </p>
        <div className="flex justify-between">
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUser