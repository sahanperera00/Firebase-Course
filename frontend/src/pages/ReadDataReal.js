import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

function ReadDataReal() {
  const database = getDatabase();
  const dbRef = ref(database, "users");
  const [array, setArray] = useState([]);

  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      for (let id in data) {
        array.push({ id, ...data[id] });
      }
      setArray(array);
    });
  }, []);

  return (
    <div>
      <h1>Read Data Real</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {array.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.email}</td>
                <td>{item.password}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReadDataReal;
