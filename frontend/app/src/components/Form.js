import { Button, Table } from "react-bootstrap";


function Form() {
    return (
        <Table hover striped bordered>
            <thead>
                <tr>
                    <th>左辺</th>
                    <th>演算子</th>
                    <th>右辺</th>
                    <th>結果</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>+</td>
                    <td>2</td>
                    <td>3</td>
                    <td>
                        <Button variant="outline-secondary">Primary</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default Form;
