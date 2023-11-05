import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import "./problems.css"
function ProblemsSet() {
    const navigate = useNavigate();
    function changeRoute(link) {
        navigate(`/problem/${link}`);
    }

    return (
        <div className='p-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Problems</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td onClick={() => changeRoute(1)} className="problem-link">Add 2 numbers</td>
                        <td>Easy</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td onClick={() => changeRoute(2)} className="problem-link">Add 3 numbers</td>
                        <td>Medium</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td onClick={() => changeRoute(3)} className="problem-link">Add 4 numbers</td>
                        <td>Difficult</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default ProblemsSet;
