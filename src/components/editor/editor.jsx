import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import "./editor.css";
import { bbedit } from "@uiw/codemirror-theme-bbedit";
import { useParams } from "react-router-dom";

const languageModes = {
    javascript: loadLanguage("jsx"),
    python: loadLanguage("python"),
    sql: loadLanguage("sql"),
    java: loadLanguage("java"),
    cpp: loadLanguage("cpp"),
    rust: loadLanguage("rust"),
    php: loadLanguage("php"),
    typescript: loadLanguage("tsx"),
    go: () => StreamLanguage.define(go),
    ruby: () => StreamLanguage.define(ruby),
    bash: () => StreamLanguage.define(shell),
};

const themeOptions = [
    { value: "light", label: "Light Theme" },
    { value: "dark", label: "Dark Theme" },
];

const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "sql", label: "SQL" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "typescript", label: "Typescript" },
    { value: "go", label: "Go" },
    { value: "ruby", label: "Ruby" },
    { value: "bash", label: "Bash" },
];

export default function CodeEditorWithLayout() {
    const Obj = useParams();
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [problemData, setProblemData] = useState("");
    const [discussionsData, setDiscussionsData] = useState("");
    const [submissionsData, setSubmissionsData] = useState("");
    const [solutionsData, setSolutionsData] = useState("");
    const [code, setCode] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("light");
    const [output, setOutput] = useState("");
    const [activeLink, setActiveLink] = useState("Problem");
    const [showOutput, setShowOutput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [resultStatus, setResultStatus] = useState(""); // "passed" or "failed"
    const [extensions, setExtensions] = useState([])
    const initialCodeExamples = {
        javascript: 'function main() {\n  return "Hello, World!";\n}',
        python: 'def main():\n  return "Hello, World!"',
        cpp: 'int main() {\n  return 0;\n}',
        java: 'public static String main() {\n  return "Hello, World!";\n}',
        php: 'function main() {\n  return "Hello, World!";\n}',
        typescript: 'function main() {\n  return "Hello, World!";\n}',
        go: 'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello!")\n}',
        ruby: 'def main\n  return "Hello, World!"\nend',
        bash: 'function main() {\n  echo "Hello, World!";\n}',
    };

    useEffect(() => {
        setCode(initialCodeExamples[selectedLanguage]);
        setExtensions(languageModes[selectedLanguage]);
        // eslint-disable-next-line
    }, [selectedLanguage]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/problems/${Obj.id}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(JSON.stringify(data), 91);

                document.title = data.problem_data.title;
                setProblemData(data.problem_data);
                setShowOutput(false);
                setIsLoading(false);
            })
            .catch((error) => {
                setShowOutput(false);
                setIsLoading(false);
            });
    }, [Obj.id]);

    // Add similar useEffect for fetching discussions, submissions, and solutions data

    const handleCodeChange = (value) => {
        setCode(value);
        setOutput("");
        setShowOutput(false);
    }

    // Add similar functions for handling discussions, submissions, and solutions data

    const handleLinkClick = (link) => {
        setActiveLink(link);
        // You can add logic here to fetch data based on the clicked link
    };

    const handleCustomInputChange = (e) => {
        setCustomInput(e.target.value);
    };

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== "") {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === name + "=") {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    const runCode = () => {
        setOutput("");
        setShowOutput(false);
        setIsLoading(true);

        try {
            const formElement = new FormData();
            formElement.append("code", code);
            const csrftoken = getCookie("csrftoken");

            fetch("/runcode", {
                method: "POST",
                body: formElement,
                headers: {
                    "X-CSRFToken": csrftoken, // Include the CSRF token in the headers
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.stdout);

                    const result = data.result;
                    setResultStatus(result);

                    setIsLoading(false);
                    setShowOutput(true);
                })
                .catch((error) => {
                    setOutput(`Error: ${error.message}`);
                    setIsLoading(false);
                    setShowOutput(true);
                });
        } catch (error) {
            setOutput(`Error: ${error.message}`);
            setIsLoading(false);
            setShowOutput(true);
        }
    };

    const submitCode = () => {
        console.log("Code submitted:", code);
        console.log("Custom input:", customInput);
        setCustomInput("");
        setShowOutput(true);
        console.log(showOutput);
        setResultStatus("passed");
        setOutput("Code submitted successfully.");
    };

    return (
        <div className="">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <div className="row text-center">
                                <div className="nav-item col-2">
                                    <a
                                        className={`nav-link  ${activeLink === "Problem" ? "active" : ""
                                            }`}
                                        aria-current={activeLink === "Problem" ? "page" : ""}
                                        onClick={() => handleLinkClick("Problem")}
                                    >
                                        Problem 
                                    </a>
                                </div>
                                <div className="nav-item col-3">
                                    <a
                                        className={`nav-link cursor-pointer ${activeLink === "Discussions" ? "active" : ""
                                            }`}
                                        onClick={() => handleLinkClick("Discussions")}
                                    >
                                        Discussions
                                    </a>
                                </div>
                                <div className="nav-item col-3">
                                    <a
                                        className={`nav-link cursor-pointer ${activeLink === "Submissions" ? "active" : ""
                                            }`}
                                        onClick={() => handleLinkClick("Submissions")}
                                    >
                                        Submissions
                                    </a>
                                </div>
                                <div className="nav-item col-3">
                                    <a
                                        className={`nav-link cursor-pointer ${activeLink === "Solutions" ? "active" : ""
                                            }`}
                                        onClick={() => handleLinkClick("Solutions")}
                                    >
                                        Solutions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="mb-3 d-flex justify-content-center">
                            <label className="m-2">Select Language:</label>
                            <select
                                className="form-select w-25"
                                value={selectedLanguage}
                                onChange={(e) => setSelectedLanguage(e.target.value)}
                            >
                                {languageOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <label className="m-2">Select Theme:</label>
                            <select
                                className="form-select w-25"
                                value={selectedTheme}
                                onChange={(e) => setSelectedTheme(e.target.value)}
                            >
                                {themeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <CodeMirror
                            value={code}
                            style={{
                                border: "2px solid gray",
                                borderRadius: "4px",
                                marginBottom: "10px",
                            }}
                            height="100%"
                            theme={selectedTheme === "dark" ? githubDark : bbedit}
                            extensions={extensions}
                            onChange={handleCodeChange}
                        />

                        <div className="mb-3">
                            <label className="form-label">Custom Input:</label>
                            <textarea
                                className="form-control"
                                rows="1"
                                value={customInput}
                                onChange={handleCustomInputChange}
                            />
                        </div>

                        <button
                            className="btn btn-primary w-25 p-2"
                            onClick={runCode}
                            disabled={isLoading}
                        >
                            {isLoading ? "Compiling..." : "Run Code"}
                        </button>

                        <button
                            className="btn btn-success ms-2 w-25 p-2"
                            onClick={submitCode}
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>

                        {showOutput && (
                            <div className="mt-2">
                                <h4>Output:</h4>
                                <pre
                                    style={{ color: resultStatus === "passed" ? "green" : "red" }}
                                >
                                    {resultStatus === "passed" ? "Passed" : "Failed"} - {output}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
