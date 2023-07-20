import { Button, Table, Container, Row, Col, ThemeProvider } from "react-bootstrap";
import { useState, props } from "react";
import axios from "axios";




function Form() {
    const [value, setValue] = useState(0);
    const [lhs, setLhs] = useState(0);
    const [rhs, setRhs] = useState(0);
    const [operand, setOpe] = useState("+");

    function Culc() {
        console.log();
        axios
            .post("http://localhost:5000/calc",
                {
                    "num1": parseFloat(lhs),
                    "num2": parseFloat(rhs),
                    "ope": operand,
                }, { timeout: 1000 })
            .then((res) => {
                console.log(`${lhs} ${operand} ${rhs} = ??`);
                console.log(res);
                setValue(res.data.result);
            })
            .catch((err) => {
                console.log(`${lhs} ${operand} ${rhs} = ??`);
                console.log("通信エラー");
            })
    }

    return (
        <Container>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>左辺</th>
                        <th>右辺</th>
                        <th>演算子</th>
                        <th>結果</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="number" value={lhs} onChange={(event) => setLhs(event.target.value)} placeholder="0"></input>
                        </td>
                        <td>
                            <input type="number" value={rhs} onChange={(event) => setRhs(event.target.value)} placeholder="0"></input>
                        </td>
                        <td>
                            <Container>
                                <Row xs="4">
                                    <Col>
                                        <Button variant="outline-secondary" onClick={() => setOpe("+")}>+</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-secondary" onClick={() => setOpe("-")}>-</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-secondary" onClick={() => setOpe("*")}>*</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-secondary" onClick={() => setOpe("/")}>/</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </td>
                        <td>
                            <p>{value}</p>
                        </td>
                        <td>
                            <Button variant="outline-secondary" num1={lhs} num2={rhs} ope={operand} onClick={Culc}>計算</Button>
                        </td>
                    </tr>
                </tbody>
            </Table >
        </Container>
    );
}

export default Form;
