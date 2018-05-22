import React from "react";

export const Qlist = function(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>{props.listy}</tbody>
      </table>
    </div>
  );
};
