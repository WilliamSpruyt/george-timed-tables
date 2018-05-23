import React from "react";

export const StatList = function(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Time</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>{props.listy}</tbody>
      </table>
    </div>
  );
};
/*
 <StatList
            listy={this.state.stats.map(ele => {
              return (
                <tr key={this.state.stats.toString() + new Date()}>
                  <td>{ele.name}</td>
                  <td>{ele.score}</td>
                  <td>{ele.time}</td>
                  <td>{ele.time / ele.score}</td>
                </tr>
              );
            })}
          />*/
