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
        { label: 'Pasaporte', value: 'PB' },
    ];

    useLayoutEffect(() => {
        register('Document', {
            required: 'El documento es obligatorio',
        });
        register('Email', {
            required: 'El correo es obligatorio',
        });
    }, [register, user, userToEdit.ID_User]);

    // Función para capitalizar la primera letra de cada palabra
    function capitalizeFirstLetter(string) {
        return string.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    const onSubmit = handleSubmit(async (values) => {
        // Validar tipo de documento
        switch (selectedType.value) {
            case 'CC':
                if (!/^\d{8,10}$/.test(values.Document)) {
                    setError('Document', {
                        type: 'manual',
                        message: 'El número de documento no es válido. Debe tener entre 8 y 10 dígitos.'
                    });
                    return;
                }
                break;
            case 'CE':
                if (!/^\d{1,12}$/.test(values.Document)) {
                    setError('Document', {
                        type: 'manual',
                        message: 'El número de documento no es válido. Debe tener hasta 12 dígitos.'
                    });
                    return;
                }
                break;
            case 'PB':
                if (!/^\d{6}[a-zA-Z]{3}$/.test(values.Document)) {
                    setError('Document', {
                        type: 'manual',
                        message: 'El número de documento no es válido. Debe tener 6 números seguidos por 3 letras.'
                    });
                    return;
                }
                break;
            default:
                break;
        }

        // Validar y convertir el nombre del usuario
        if (!/^[A-ZÁÉÍÓÚÜÑa-záéíóúüñ\s]*$/.test(values.Name_User)) {
            setError('Name_User', {
                type: 'manual',
                message: 'El nombre no es válido. Debe empezar con mayúscula y contener solo letras y espacios.'
            });
            return;
        }

        // Validar correo electrónico
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.Email)) {
            setError('Email', {
                type: 'manual',
                message: 'La dirección de correo electrónico no es válida.'
            });
            return;
        }

        // Validar contraseña
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(values.Password)) {
            setError('Password', {
                type: 'manual',
                message: 'La contraseña debe tener entre 8 y 15 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial.'
            });
            return;
        }

        // Capitalizar la primera letra de cada palabra
        values.Name_User = capitalizeFirstLetter(values.Name_User.trim().toLowerCase());
        values.LastName_User = capitalizeFirstLetter(values.LastName_User.trim().toLowerCase());

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
                                                validate: (value) => {
                                                    const parsedValue = parseInt(value);
                                                    if (
                                                        isNaN(parsedValue) ||
                                                        parsedValue < 10000000 ||
                                                        parsedValue > 9999999999
                                                    ) {
                                                        return "El número no es valido, debe tener de 8 a 10 caracteres.";
                                                    }
                                                }
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
                                                    value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                                                    message:
                                                        "El nombre del mesero debe tener la primera letra en mayúscula y solo letras."
                                                }
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
                                                    value: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s]*[a-záéíóúñ]$/,
                                                    message:
                                                        "El apellido del mesero debe tener la primera letra en mayúscula y solo letras."
                                                }
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