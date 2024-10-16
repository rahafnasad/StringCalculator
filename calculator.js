function getPriority(...args) {
  const result = [];
  let first = true;
  for (let i = 1; i < args.length; i += 2) {
    if (!isOperator(args[i])) {
      throw new Error("Invalid operator");
    }
    if (args[i] === "/" && first) {
      result.push(args[i - 1], args[i], args[i + 1]);
      first = false;
      continue;
    }
    if (args[i] === "/" && i!=args.length-2) {
        result.push(args[i], args[i - 1]);
    }
    if (args[i] === "/" && i===args.length-2) {
        result.push(args[i], args[i + 1]);
      }
   
  }
  for (let i = 1; i < args.length; i += 2) {
    if (args[i] === "*" && first) {
      result.push(args[i - 1], args[i], args[i + 1]);

      first = false;
      continue;
    }
    if (args[i] === "*" && i!=args.length-2) {
        result.push(args[i], args[i - 1]);
        console.log(args[i]+ args[i - 1])
    }
    if (args[i] === "*" && i===args.length-2) {
        result.push(args[i], args[i + 1]);
      }
  }
  for (let i = 1; i < args.length; i += 2) {
    if (args[i] === "-" && first) {
      result.push(args[i - 1], args[i], args[i + 1]);

      first = false;
      continue;
    }
    if (args[i] === "-" && i!=args.length-2) {
        result.push(args[i], args[i - 1]);
    }
    if (args[i] === "-" && i===args.length-2) {
        result.push(args[i], args[i + 1]);
      }
  }
  for (let i = 1; i < args.length; i += 2) {
    if (args[i] === "+" && first) {
      result.push(args[i - 1], args[i], args[i + 1]);
      first = false;
      continue;
    }
    if (args[i] === "+" && i!=args.length-2) {
        result.push(args[i], args[i - 1]);
    }
    if (args[i] === "+" && i===args.length-2) {
        result.push(args[i], args[i + 1]);
      }
  }

  return result;
}
function isOperator(operator) {
  return ["+", "-", "*", "/", "%", "^"].includes(operator);
}
function isNumber(value) {
  return typeof value === "number";
}
function calculator(...numbers) {
  const args = getPriority(...numbers);
  console.log(args)
  let result = args[0];
  if (!isNumber(args[0])) {
    throw new Error("Invalid input type");
  }

  let operators = [];
  let operatorsIndex = [];
  for (let i = 1; i < args.length; i += 2) {
    if (!isOperator(args[i])) {
      throw new Error("Invalid operator");
    }

    operators.push(args[i]);

    operatorsIndex.push(i);
  }

  for (let i = 0; i < operators.length; i++) {
    let index = operatorsIndex[i];
    let num2 = args[index + 1];
    if (!isNumber(num2)) {
      throw new Error("Invalid input type");
    }

    switch (operators[i]) {
      case "+":
        result += num2;
        break;
      case "-":
        result -= num2;

        break;
      case "*":
        result *= num2;
        break;
      case "/":
        if (num2 == 0) {
          throw new Error("Division by zero");
        }
        result /= num2;
        break;
      default:
        throw new Error("Invalid operator");
    }
  }

  return result;
}
module.exports = calculator;
