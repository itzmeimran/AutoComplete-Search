export default function HighLightText({ str, subStr }) {
  const index = str.toLowerCase().indexOf(subStr.toLowerCase());

  if (index === -1 || !subStr) {
    return <p>{str}</p>; // No match or empty input, return as is
  }

  const before = str.substring(0, index); // Before part
  const match = str.substring(index, index + subStr.length); // Hightlight part
  const after = str.substring(index + subStr.length); // After the high light part passing single argument to be noted

  return (
    <p>
      {before}
      <span
        style={{
          fontWeight: "bold",
          color: "darkblue",
          borderRadius: "2px",
          backgroundColor: "skyblue",
          padding: "2px",
        }}
      >
        {match}
      </span>
      {after}
    </p>
  );
}
