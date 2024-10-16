function isOperator(operator) {
  return ["+", "-", "*", "/"].includes(operator);
}
function isNumber(value) {
  return typeof value === "number";
}
function calculator(...args) {
  if (!isNumber(args[0])) {
    throw new Error("Invalid input type");
  }
  if (args[0] >= 1000) {
    args[0] = 0;
  }
  let result = 0;
  for (let i = 1; i < args.length; i += 2) {
    if (!isOperator(args[i])) {
      throw new Error("Invalid operator");
    }
    if (!isNumber(args[i + 1])) {
      throw new Error("Invalid input type");
    }
    if (args[i + 1] >= 1000) {
      args[i + 1] = 0;
    }
    if (args[i] === "/") {
      if (args[i + 1] === 0) {
        throw new Error("Division by zero");
      }

      result = args[i - 1] / args[i + 1];
      args[i - 1] = result;
      args.splice(i, 2);
      i -= 2;
    }
  }
  for (let i = 1; i < args.length; i += 2) {
    if (args[i] === "*") {
      result = args[i - 1] * args[i + 1];
      args[i - 1] = result;
      args.splice(i, 2);
      i -= 2;
    }
  }
  for (let i = 1; i < args.length; i += 2) {
    if (args[i] === "-") {
      result = args[i - 1] - args[i + 1];
      args[i - 1] = result;
      args.splice(i, 2);
      i -= 2;
    }
  }
  for (let i = 1; i < args.length; i += 2) {
    if (args[i] === "+") {
      result = args[i - 1] + args[i + 1];
      args[i - 1] = result;
      args.splice(i, 2);
      i -= 2;
    }
  }
  return result;
}

module.exports = calculator;
