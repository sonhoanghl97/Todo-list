import React, { Component } from 'react';

class Table extends Component{
    render(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>image column 1</th>
                        <th>image column 2</th>
                        <th>image column 3</th>
                    </tr>
                </thead>
                <tbody>
                    {[1,2,3].map((item, index) => (
                        <tr key={index}>
                            <td><img src={"http://bit.ly/3ayPusa"} width={200}/></td>
                            <td><img src={"http://bit.ly/3ayPusa"} width={200}/></td>
                            <td><img src={"http://bit.ly/3ayPusa"} width={200}/></td>
                        </tr>
                    ))}


                </tbody>
            </table>
        )
    }
}

export default Table