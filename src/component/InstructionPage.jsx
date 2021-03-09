import React from 'react';
import { Button, InputGroup, FormControl, Table, Form } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import PrintByDiv from '../utils/WindowPrinter'
import {
  Link
} from "react-router-dom";
import ViewTable from './ViewTable';
import { Apps } from '@material-ui/icons';

function InstructionPage(props) {

    return(
     <div style={{ height: '100vh'}}>
        <span style={{ fontSize: '24px', color: '#616161', margin: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>Click on {<Apps style={{fontSize: '36px'}}/>} to view navigations and perform tasks.</span>
    </div>
   );
}

export default InstructionPage;
