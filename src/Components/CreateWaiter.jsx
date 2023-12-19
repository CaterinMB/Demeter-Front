import React, { useState } from 'react';
import Select from 'react-select';
import Box from "@mui/material/Box";
import { useForm, Controller } from 'react-hook-form';
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

function CreateWaiter({ onClose, onCreated }) {
    const { control, register, handleSubmit, formState: { errors, isValid }, setError } = useForm();
    const { createWaiter, user } = useUser();
    const [selectedType, setSelectedType] = useState({ label: 'Seleccione tipo', value: '', isDisabled: true });

    const typeOptions = [
        { label: 'Seleccione tipo', value: '', isDisabled: true },
        { label: 'Cédula de ciudadanía', value: 'CC' },
        { label: 'Cédula de extranjería', value: 'CE' },
    ];

    // Función para capitalizar la primera letra de cada palabra
    function capitalizeFirstLetter(string) {
        return string.replace(/\b\w/g, (match) => match.toUpperCase());
    }

    const onSubmit = handleSubmit(async (values) => {

        // Validar tipo de documento seleccionado
        if (!selectedType || selectedType.value === '') {
            setError('Type_Document', {
                type: 'manual',
                message: 'Debe seleccionar un tipo de documento.'
            });
            return;
        }

        // Validar y convertir el documento según el tipo seleccionado
        switch (selectedType.value) {
            case 'CC':
                // Validar que el documento tenga solo números y esté entre 8 y 10 dígitos
                const ccRegex = /^[0-9]+$/;
                if (!ccRegex.test(values.Document) || values.Document.length < 8 || values.Document.length > 10) {
                    setError('Document', {
                        type: 'manual',
                        message: 'El número de documento no es válido. Debe tener entre 8 y 10 dígitos.'
                    });
                    return;
                }
                break;
            case 'CE':
                // Validar que el documento tenga solo números y sea menor a 12 dígitos
                const ceRegex = /^[0-9]+$/;
                if (!ceRegex.test(values.Document) || values.Document.length > 12) {
                    setError('Document', {
                        type: 'manual',
                        message: 'El número de documento no es válido. Debe tener menos de 12 dígitos.'
                    });
                    return;
                }
                break;
            default:
                break;
        }

        // Capitalizar la primera letra de cada palabra
        values.Name_User = capitalizeFirstLetter(values.Name_User.trim().toLowerCase());
        values.LastName_User = capitalizeFirstLetter(values.LastName_User.trim().toLowerCase());
        values.Restaurant = capitalizeFirstLetter(values.Restaurant.trim().toLowerCase());

        // Asignar el tipo de documento al valor seleccionado
        values.Type_Document = selectedType.value;

        // Crear el mesero y llamar a las funciones proporcionadas
        createWaiter(values);
        onCreated();
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
                            <h5>Registro de mesero</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="control">
                                    <div className="form-group col-md-6 ml-3">
                                        <label htmlFor="Type_Document" className="form-label mt-3">
                                            Tipo de documento: <strong>*</strong>
                                        </label>
                                        <Controller
                                            control={control}
                                            name="ProductCategory_ID"
                                            rules={{ required: 'Este campo es obligatorio' }}
                                            render={({ field }) => (
                                                <Select
                                                    options={typeOptions}
                                                    {...register("Type_Document")}
                                                    value={selectedType}
                                                    onChange={(selectedOption) => {
                                                        setSelectedType(selectedOption);
                                                        field.onChange(selectedOption);
                                                    }}
                                                    styles={customStyles}
                                                    title='Se selecciona el tipo de documento del mesero.'
                                                    className="form-selects"
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary: '#201E1E',
                                                        },
                                                    })}
                                                />
                                            )}
                                        />
                                        {errors.Type_Document && (
                                            <p className="text-red-500">
                                                {errors.Type_Document.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="form-group col-md-6 ml-3">
                                        <label htmlFor="Document" className="form-label">
                                            Número de identidad: <strong>*</strong>
                                        </label>
                                        <input
                                            type="number"
                                            {...register("Document", {
                                                required: "El documento es obligatorio",
                                            })}
                                            className="form-control"
                                            title='Se ingresa el numero de identificacion del mesero.'
                                        />
                                        {errors.Document && (
                                            <p className="text-red-500">
                                                {errors.Document.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="form-group col-md-6 ml-3">
                                        <label htmlFor="Name_User" className="form-label">
                                            Nombres: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("Name_User", {
                                                required: "El nombre es obligatorio",
                                            })}
                                            type="text"
                                            className="form-control"
                                            title='Se ingresa el nombre del mesero.'
                                        />
                                        {errors.Name_User && (
                                            <p className="text-red-500">
                                                {errors.Name_User.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="form-group col-md-6 ml-3">
                                        <label htmlFor="LastName_User" className="form-label">
                                            Apellidos: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("LastName_User", {
                                                required: 'El apellido es obligatorio',
                                            })}
                                            type="text"
                                            className="form-control"
                                            title='Se ingresa el apellido del mesero.'
                                        />
                                        {errors.LastName_User && (
                                            <p className="text-red-500">
                                                {errors.LastName_User.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="control">
                                    <div className="form-group col-md-6 ml-3">
                                        <label htmlFor="Restaurant" className="form-label">
                                            Restaurante: <strong>*</strong>
                                        </label>
                                        <input
                                            {...register("Restaurant", {
                                                required: "El restaurante es obligatorio",
                                            })}
                                            type="text"
                                            className="form-control"
                                            title='Se ingresa el restaurante al que pertenece el mesero.'
                                        />
                                        {errors.Restaurant && (
                                            <p className="text-red-500">
                                                {errors.Restaurant.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="buttonconfirm">
                                    <div className="ml-3">
                                        <button
                                            className="btn btn-primary"
                                            title='Se guardan los datos del nuevo mesero.'
                                        >
                                            Confirmar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={onCancel}
                                            type="button"
                                            title='Se cancelan los datos del nuevo mesero.'
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

export default CreateWaiter