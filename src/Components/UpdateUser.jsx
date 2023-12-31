import React, { useState, useEffect, useLayoutEffect } from 'react';
import Select from 'react-select';
import Box from "@mui/material/Box";
import { useForm } from 'react-hook-form';
import { useUser } from '../Context/User.context.jsx';

const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: state.isFocused ? '1px solid #201E1E' : '1px solid #201E1E',
        '&:hover': {
            border: '1px solid #201E1E',
        },
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#e36209' : state.isFocused ? '#e36209' : 'white',
        color: state.isSelected ? 'white' : state.isFocused ? '#555' : '#201E1E',
        '&:hover': {
            backgroundColor: '#e36209',
            color: 'white',
        },
        cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),
};

function UpdateUser({ onClose, userToEdit }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: userToEdit });
    const { updateUser, user } = useUser();
    const [selectedType, setSelectedType] = useState(userToEdit.Type_Document);

    const typeOptions = [
        { label: 'Cédula de ciudadanía', value: 'CC' },
        { label: 'Cédula de extranjería', value: 'CE' },
        { label: 'Pasaporte', value: 'PB' }
    ];

    useLayoutEffect(() => {
        register('Document', {
            required: 'El documento es obligatorio',
        });
        register('Email', {
            required: 'El correo es obligatorio',
        });
    }, [register, user, userToEdit.ID_User]);

    const onSubmit = handleSubmit(async (values) => {
        values.Type_Document = selectedType;

        updateUser(userToEdit.ID_User, values);
        onClose();
    });

    const onCancel = () => {
        onClose();
    };

    return (
        <Box sx={{ ...style, width: 600 }}>
            <div>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Editar un empleado</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="control">
                                    <div className="form-group col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="Type_Document" className="form-label mt-3">
                                                Tipo de documento: <strong>*</strong>
                                            </label>
                                            <Select
                                                options={typeOptions}
                                                {...register("Type_Document", {
                                                    required: 'El tipo es obligatorio,',
                                                })}
                                                value={typeOptions.find(option => option.value === selectedType)}
                                                onChange={(selectedOption) => setSelectedType(selectedOption.value)}
                                                styles={customStyles}
                                                className='form-selects'
                                                theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: '#e36209',
                                                    },
                                                })}
                                            />
                                            {errors.Type_Document && (
                                                <p className="text-red-500">
                                                    {errors.Type_Document.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="Document" className="form-label">
                                            N° de documento: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("Document", {
                                                required: "El documento es obligatorio",
                                            })}
                                            type="number"
                                            placeholder='N° documento'
                                            className="form-control"
                                        />
                                        {errors.Document && (
                                            <p className="text-red-500">
                                                {errors.Document.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="Name_User" className="form-label">
                                            Nombres: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("Name_User", {
                                                required: "El nombre es obligatorio",
                                                pattern: {
                                                    value: /^[A-Za-zÁÉÍÓÚÑáéíóúñ]+(\s[A-Za-zÁÉÍÓÚÑáéíóúñ]+)?$/,
                                                    message:
                                                        'Solo se permiten letras, tildes y hasta un espacio entre letras.',
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: 'El nombre debe tener al menos 3 caracteres.',
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'El nombre no puede tener más de 30 caracteres.',
                                                },
                                                setValueAs: (value) =>
                                                    value
                                                        .trim()
                                                        .replace(/\s+/g, ' ')
                                                        .toLowerCase()
                                                        .replace(/^(.)/, (match) => match.toUpperCase()),
                                            })}
                                            type="text"
                                            placeholder='Nombre'
                                            className="form-control"
                                        />
                                        {errors.Name_User && (
                                            <p className="text-red-500">
                                                {errors.Name_User.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label htmlFor="LastName_User" className="form-label">
                                            Apellidos: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("LastName_User", {
                                                required: 'El apellido es obligatorio',
                                                pattern: {
                                                    value: /^[A-Za-zÁÉÍÓÚÑáéíóúñ]+(\s[A-Za-zÁÉÍÓÚÑáéíóúñ]+)?$/,
                                                    message:
                                                        'Solo se permiten letras, tildes y hasta un espacio entre letras.',
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: 'El nombre debe tener al menos 3 caracteres.',
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'El nombre no puede tener más de 30 caracteres.',
                                                },
                                                setValueAs: (value) =>
                                                    value
                                                        .trim()
                                                        .replace(/\s+/g, ' ')
                                                        .toLowerCase()
                                                        .replace(/^(.)/, (match) => match.toUpperCase()),
                                            })}
                                            type="text"
                                            placeholder='Apellido'
                                            className="form-control"
                                        />
                                        {errors.LastName_User && (
                                            <p className="text-red-500">
                                                {errors.LastName_User.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="Email" className="form-label">
                                            Correo electrónico: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("Email", {
                                                required: 'El correo es obligatorio',
                                                pattern: {
                                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                                                    message: 'El correo electrónico no es válido'
                                                }
                                            })}
                                            type="email"
                                            placeholder='Correo electrónico'
                                            className="form-control"
                                        />
                                        {errors.Email && (
                                            <p className="text-red-500">
                                                {errors.Email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="buttonconfirm">
                                    <div className="mb-3">
                                        <button
                                            className="btn btn-primary mr-5"
                                            type="submit"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={onCancel}
                                            type="button"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default UpdateUser