import * as React from 'react';
import {TodoEntity} from '../../../model/todo';

interface Props  {
  todo : TodoEntity;
}

export const TodoRowComponent = (props: Props) => {
  const { userId, id, title, completed } = props.todo
   return (
     <tr>
       <td>
        <span>{userId}</span>
       </td>
       <td>
         <span>{id}</span>
       </td>
       <td>
        <span>{title}</span>
       </td>
       <td>
        <span>{completed && 'Completada'}</span>
       </td>
     </tr>
   );
}