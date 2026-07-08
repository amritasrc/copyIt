const snippets = [
    {
        id: 1,
        title: "Binary Search",
        language: "JavaScript",
        code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;

    if (arr[mid] < target)
      left = mid + 1;
    else
      right = mid - 1;
  }

  return -1;
}`,
    },
    {
        id: 2,
        title: "Center a Div",
        language: "CSS",
        code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    },
    {
        id: 3,
        title: "Fetch API",
        language: "JavaScript",
        code: `const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  console.log(data);
};`,
    },
    {
        id: 4,
        title: "useEffect Example",
        language: "React",
        code: `useEffect(() => {
  console.log("Component Mounted");
}, []);`,
    },
    {
        id: 5,
        title: "Reverse String",
        language: "Python",
        code: `text = "Hello World"
print(text[::-1])`,
    },
    {
        id: 6,
        title: "Tailwind Button",
        language: "Tailwind CSS",
        code: `<button className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
  Submit
</button>`,
    },
];

export default snippets