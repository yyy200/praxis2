import React from "react";
import "./table.css";

interface Props {
  data: Array<{ [key: string]: any }>;
}

export const Table: React.FC<Props> = (props) => {
  return props.data.length ? (
    <table className="styled-table">
      <thead>
        <tr>
          {Object.keys(props.data[0]).map((key) => (
            <th>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((el) => (
          <tr>
            {Object.values(el).map((value) => (
              <td>{JSON.stringify(value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <h2>No Data yet</h2>
  );
};
