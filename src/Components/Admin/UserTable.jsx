export default function UserTable({ rows, columns, renderRow, noDataMsg }) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length}>{noDataMsg}</td>
            </tr>
          )}
          {rows.map((u) => (
            <tr key={u.userID}>{renderRow(u)}</tr>
          ))}
        </tbody>
      </table>
    );
  }
  