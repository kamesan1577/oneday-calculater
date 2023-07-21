import { Button, Table, Container, Row, Col, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";




function Form() {
    const api_base = process.env.REACT_APP_API_PATH;
    const [value, setValue] = useState(0);
    const [lhs, setLhs] = useState(0);
    const [rhs, setRhs] = useState(0);
    const [operand, setOpe] = useState("+");
    const [history, setHistory] = useState([]);
    const [index, setIndex] = useState(0);
    let uniqueId;
    const [cookies, setCookie, removeCookie] = useCookies(["cookie_id"])
    if (!cookies.cookie_id) {
        uniqueId = uuidv4();
        setCookie("cookie_id", uniqueId);
    }

    function Culc() {
        axios
            .post(`${api_base}/calc`,
                {
                    "cookie_id": cookies.cookie_id,
                    "num1": parseFloat(lhs),
                    "num2": parseFloat(rhs),
                    "ope": operand,
                }, { timeout: 1000 })
            .then((res) => {
                console.log(`${lhs} ${operand} ${rhs} = ??`);
                console.log(res);
                setValue(res.data.result);
                History();
            })
            .catch((err) => {
                console.log(`${lhs} ${operand} ${rhs} = ??`);
                console.log(err);
            })
    }

    function History() {
        axios
            .post(`${api_base}/history`,
                {
                    "cookie_id": cookies.cookie_id,
                }, { timeout: 1000 })
            .then((res) => {
                console.log(res);
                setHistory(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function PreviousResult() {
        if (history.length - 1 > index) {
            setIndex(index + 1);
            console.log(history.length, index, "Previous");
            setLhs(history[index + 1].num1);
            setRhs(history[index + 1].num2);
            setValue(history[index + 1].result);
            setOpe(history[index + 1].operant);
        }
    }

    function NextResult() {
        if (index > 0) {
            setIndex(index - 1);
            console.log(history.length, index, "Next");
            setLhs(history[index - 1].num1);
            setRhs(history[index - 1].num2);
            setValue(history[index - 1].result);
            setOpe(history[index - 1].operant);
        }
    }

    useEffect(() => {
        History();
    }, [])

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
                                    <Col>
                                        <Button variant="primary" onClick={PreviousResult}>←</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="primary" onClick={NextResult}>→</Button>
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
