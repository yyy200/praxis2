import { useState } from "react";
import "./App.css";
import { Card } from "./card/card";
import { Form } from "./form/form";
import { Table } from "./table/table";

function App() {
  let [data, setData] = useState<Array<{ [key: string]: any }>>([]);

  const setDataFunc = (dataRow: { [key: string]: any }) => {
    setData([...data, dataRow]);
    console.log(dataRow);
  };

  return (
    <div className="App">
      <h1>Submit a tree</h1>
      <Card padding={true}>
        <Form setData={setDataFunc}></Form>
      </Card>
      <Card>
        <Table data={data}></Table>
      </Card>
    </div>
  );
}

export default App;
