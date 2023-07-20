import { Button, Table, Container, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";
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
        <Container class="align-items-center d-flex">
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>計算式を入力</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <InputGroup>
                                <input type="number" class="form-control" style={{ textAlign: "center" }} value={lhs} onChange={(event) => setLhs(event.target.value)} placeholder="0"></input>
                                <span class="input-group-text">{operand}</span>
                                <input type="number" class="form-control" style={{ textAlign: "center" }} value={rhs} onChange={(event) => setRhs(event.target.value)} placeholder="0"></input>
                                <span class="input-group-text">=</span>
                                <span class="form-control">{value}</span>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Container>
                                <Row xs="5">
                                    <Col>
                                        <Button variant={operand != "+" ? "outline-secondary" : "outline-primary"} onClick={() => setOpe("+")}>+</Button>
                                    </Col>
                                    <Col>
                                        <Button variant={operand != "-" ? "outline-secondary" : "outline-primary"} disabled={operand != "-" ? false : true} onClick={() => setOpe("-")}>-</Button>
                                    </Col>
                                    <Col>
                                        <Button variant={operand != "*" ? "outline-secondary" : "outline-primary"} disabled={operand != "*" ? false : true} onClick={() => setOpe("*")}>*</Button>
                                    </Col>
                                    <Col>
                                        <Button variant={operand != "/" ? "outline-secondary" : "outline-primary"} disabled={operand != "/" ? false : true} onClick={() => setOpe("/")}>/</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="primary" num1={lhs} num2={rhs} ope={operand} onClick={Culc}>計算</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </td>
                    </tr>

                </tbody>
            </Table >
        </Container >
    );
}

export default Form;
