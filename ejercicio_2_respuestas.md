# Ejercicio 2

## 2.1

Para implementar las acciones del frontend utilizando Redux, seguiría estos pasos:

### Instalacion de Redux

1. Instalar redux junto a las dependencias que necesite el proyecto
2. Crear el store y el contexto de redux
3. Comenzar a crear archivos separados con los actions, types, reducers para cada operación
4. Utilizar middleware como redux-thunk o redux-saga para manejar acciones asíncronas, como las solicitudes de inicio de sesión y registro
5. Utilizar useSelector o useDispatch para llamar a estos reducers y obtener informacion de las variables o ejecutar alguna funcion

## 2.2

Si quisiera agregar una ruta al proyecto, reestructuraría el archivo `index.js` de la siguiente manera:

1. Agregar la nueva ruta utilizando un enrutador como react-router-dom.
2. Asegurarme de importar los componentes necesarios para la nueva ruta.
3. Definir la ruta en el enrutador, especificando la URL y el componente asociado.
4. Verificar si la ruta deberia o no estar privada,
5. En el caso de que sea privada, esta deberia tener un validador segun el jwt que devuelve el inicio de sesion
