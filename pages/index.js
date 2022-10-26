import { useState } from "react";

export default function Home() {
  const [arrayInput, setArrayInput] = useState(["🕴️", "🕴️", "🕴️", "🕴️", "🕴️"]);
  const [builtinReverse, setBuiltinReverse] = useState(arrayInput);
  const [builtinPerformance, setBuiltinPerformance] = useState(0);

  const [forReverse, setForReverse] = useState(arrayInput);
  const [forPerformance, setForPerformance] = useState(0);

  const [recursionReverse, setRecursionReverse] = useState(arrayInput);
  const [recursionPerformance, setRecursionPerformance] = useState(0);

  const getAverage = (array) => array.reduce((a, b) => a + b) / array.length;

  const capturePerformance = (reverseFunction, performanceSetter) => {
    const performanceTimings = [];
    for (let i = 0; i < 5; i++) {
      console.time(`${reverseFunction.name} performance`);
      const start = window.performance.now();
      reverseFunction();
      const end = window.performance.now();
      console.timeEnd(`${reverseFunction.name} performance`);
      performanceTimings.push(end - start);
    }

    const averagePerformance = getAverage(performanceTimings);
    performanceSetter(averagePerformance);
  };

  const reverseUsingBuiltin = () => {
    setBuiltinReverse(arrayInput.slice().reverse());
  };

  const reverseUsingFor = () => {
    const reversedArray = [];
    for (let i = arrayInput.length; i >= 0; i--) {
      reversedArray.push(arrayInput[i]);
    }
    setForReverse(reversedArray);
  };

  const reverseUsingRecursion = () => {
    const reversedArray = [];
    const moveValue = (array, index) => {
      reversedArray.push(array[index]);
      if (index === -1) {
        return reversedArray;
      }
      return moveValue(array, index - 1);
    };
    moveValue(arrayInput, arrayInput.length);
    setRecursionReverse(reversedArray);
  };

  const handleChange = (e, indexToUpdate) => {
    const startOfArray =
      indexToUpdate !== 0 ? arrayInput.slice(0, indexToUpdate) : [];
    const endOfArray = arrayInput.slice(indexToUpdate + 1);
    const newArray = [...startOfArray, e.target.value, ...endOfArray];
    setArrayInput(newArray);
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: "50px",
          flexDirection: "column",
          alignItems: "center",
          height: "100px",
        }}
      >
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          {Array.from([0, 1, 2, 3, 4]).map((_, index) => (
            <div key={_}>
              <label htmlFor={`array${index}`}>Item number {index + 1}</label>
              <select
                id={`array${index}`}
                name={`array${index}`}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="🕴️">🕴️</option>
                <option value="🚀">🚀</option>
                <option value="🫡">🫡</option>
                <option value="👻">👻</option>
                <option value="😭">😭</option>
                <option value="🥺">🥺</option>
                <option value="🔥">🔥</option>
                <option value="🎃">🎃</option>
                <option value="💀">💀</option>
              </select>
            </div>
          ))}
        </form>
        <h2>Your Selected Array Values Are:</h2>
        <div>{arrayInput}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Proof of recursion</th>
            <th>{"Performance (averaged over 5 runs)"}</th>
            <th>Method detail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button
                onClick={() =>
                  capturePerformance(reverseUsingBuiltin, setBuiltinPerformance)
                }
              >
                {"Reverse the array using array.reverse()"}
              </button>
            </td>
            <td>{builtinReverse}</td>
            <td>{builtinPerformance}</td>
            <td>
              <pre>
                <code>{"arrayInput.slice().reverse()"}</code>
              </pre>
            </td>
          </tr>
          <tr>
            <td>
              <button
                onClick={() =>
                  capturePerformance(reverseUsingFor, setForPerformance)
                }
              >
                {"Reverse the array using for loop"}
              </button>
            </td>
            <td>{forReverse}</td>
            <td>{forPerformance}</td>
            <td>
              <pre>
                <code>{`const reversedArray = [];
    for (let i = arrayInput.length; i >= 0; i--) {
      reversedArray.push(arrayInput[i]);
    }`}</code>
              </pre>
            </td>
          </tr>
          <tr>
            <td>
              <button
                onClick={() =>
                  capturePerformance(
                    reverseUsingRecursion,
                    setRecursionPerformance
                  )
                }
              >
                {"Reverse the array using recursion"}
              </button>
            </td>
            <td>{recursionReverse}</td>
            <td>{recursionPerformance}</td>
            <td>
              <pre>
                <code>{`const reversedArray = [];
    const moveValue = (array, index) => {
      reversedArray.push(array[index]);
      if (index === -1) {
        return reversedArray;
      }
      return moveValue(array, index - 1);
    };
    moveValue(arrayInput, arrayInput.length);`}</code>
              </pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
