import React, { useState } from "react";

const Tabla = () => {
  const [nombre, setNombre] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [datos, setDatos] = useState<
    { nombre: string; age: number; date: Date }[]
  >([]);
  const [error, setError] = useState<string>("");

  const [colname, setColname] = useState<string>("");
  const [newCol, setNewCol] = useState<{ colname: string }[]>([]);

  const Submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setDatos([...datos, { nombre, age, date }]);
    setNombre("");
    setAge(0);
    setDate(new Date());
    setError("");
  };

  const Delete = (index: number) => {
    const newDatos = [...datos];
    newDatos.splice(index, 1);
    setDatos(newDatos);
  };

  const AddColumn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewCol([...newCol, { colname }]);
  };

  return (
    <>
      <h1 className="Title">Table</h1>

      <form onSubmit={Submit} className="formulario">
        <div className="tabla">
          <div className="nombre">Name</div>

          <div className="age">Age</div>

          <div className="date">Birth Date</div>

          {/*
          SE DEBE USAR <React.Fragment></React.Fragment> 
          PARA CREAR UNA NUEVA FILA EN LA TABLA AÑADIENDO
          UN NUEVO INPUT A EL FORMULARIO WTF
          ¿CADA NUEVO INPUT CREA UN NUEVO HOOK DE ESTADO?
          FALTA ACTUALIZAR EL GRID-TEMPLATE Y 
          DIFERENCIAR LOS INPUTS POR SU SELECT
          */}

          {newCol.map(({ colname }, index) => (
            <React.Fragment key={index}>
              <div className="nombre">{colname}</div>
            </React.Fragment>
          ))}

          <div className="blaquito"></div>

          {datos.map(({ nombre, age, date }, index) => (
            <React.Fragment key={index}>
              <div className="item">{nombre}</div>

              <div className="item">{age}</div>

              <div className="item">{date.toISOString().split("T")[0]}</div>

              <button onClick={() => Delete(index)}>eliminar</button>
            </React.Fragment>
          ))}

          <div className="Input">
            <input
              className="Input"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="name"
            />
          </div>

          <div className="Input">
            <input
              className="Input"
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              placeholder="age"
            />
          </div>

          <div className="Input">
            <input
              className="Input"
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              placeholder="birth date"
            />
          </div>

          {newCol.map(({ colname }, index) => (
            <React.Fragment key={index}>
              <div className="Input">
                <input className="Input" type="text" />
              </div>
            </React.Fragment>
          ))}

          <button type="submit" className="btn">
            Añadir
          </button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      <h1 className="Title">Add column</h1>

      <form onSubmit={AddColumn}>
        <div className="tablita">
          <div>
            <input
              className="Input"
              type="text"
              value={colname}
              onChange={(e) => setColname(e.target.value)}
              placeholder="column name"
            />
            <select name="select">
              <option value="string" selected>
                string
              </option>
              <option value="number">number</option>
              <option value="date">date</option>
              <option value="checkbox">checkbox</option>
            </select>
          </div>

          <button type="submit" className="btn2">
            Add column
          </button>
        </div>
      </form>
    </>
  );
};

export default Tabla;
