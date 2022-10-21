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
    <div>
      <form>
        <label htmlFor="array0">First item</label>
        <select id="array0" name="array0" onChange={(e) => handleChange(e, 0)}>
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
        <label htmlFor="array1">Second item</label>
        <select id="array1" name="array1" onChange={(e) => handleChange(e, 1)}>
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
        <label htmlFor="array2">Third item</label>
        <select id="array2" name="array2" onChange={(e) => handleChange(e, 2)}>
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
        <label htmlFor="array3">First item</label>
        <select id="array3" name="array3" onChange={(e) => handleChange(e, 3)}>
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
        <label htmlFor="array4">Fourth item</label>
        <select id="array4" name="array4" onChange={(e) => handleChange(e, 4)}>
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
      </form>
      <h2>Your Array Values are:</h2>
      <div>{arrayInput}</div>
      <button
        onClick={() =>
          capturePerformance(reverseUsingBuiltin, setBuiltinPerformance)
        }
      >
        {"Reverse the array using array.reverse()"}
      </button>
      <p>performance for builtin reverse was: {builtinPerformance}</p>
      {builtinReverse}
      <button
        onClick={() => capturePerformance(reverseUsingFor, setForPerformance)}
      >
        {"Reverse the array using for loop"}
      </button>
      <p>performance for for reverse was: {forPerformance}</p>
      {forReverse}
      <button
        onClick={() =>
          capturePerformance(reverseUsingRecursion, setRecursionPerformance)
        }
      >
        {"Reverse the array using recursion"}
      </button>
      <p>performance for recursion reverse was: {recursionPerformance}</p>
      {recursionReverse}
    </div>
  );
}
