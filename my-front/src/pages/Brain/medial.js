import React, { useState } from 'react';


// 단어 목록과 힌트
const words = [
    { word: "견책", clue: "잘못이나 옳지 못한 일을 잡아내어 따지고 나무람." },
    { word: "효자", clue: "아버지와 어머니를 아울러 이르는 말." },
    { word: "그램", clue: "물질의 기본 단위." },
    { word: "경무관", clue: "경찰 사무를 맡아보는 관청." },
    { word: "페스트", clue: "페스트균이 일으키는 급성 전염병." },
    { word: "연주자", clue: "악기 따위를 연주하는 사람." },
    { word: "범위", clue: "사물이나 현상의 크기나 범위." },
    { word: "청원서", clue: "사정을 하소연하여 도와주기를 간절히 바라는 문서." },
    { word: "정경", clue: "사건이나 환경, 인물 따위를 둘러싼 주위의 정경." },
    { word: "경제학자", clue: "경제 발전의 역사를 전문적으로 연구하는 사람." },
];

// 그리드의 초기 상태를 정의합니다.
const initialGrid = [
    ["", "", "1", "", "", "", "", "", "", ""],
    ["", "2", "", "", "", "", "", "2", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "4", "", "", "", "", "", ""],
    ["", "5", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "6", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
];

// 정답 배열을 정의합니다.
const solutionGrid = [
    ["", "", "1", "견", "책", "", "", "", "", ""],
    ["", "2", "", "", "", "", "", "2", "정", "경"],
    ["", "", "", "", "", "", "", "", "", "학"],
    ["", "", "", "4", "경", "무", "관", "", "", "자"],
    ["", "5", "페", "스", "트", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "6", "연", "주", "자", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
];

// 셀 컴포넌트
const Cell = ({ value, onChange, readOnly }) => {
    return (
        <input
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`cell ${readOnly ? 'readonly' : ''}`}
            readOnly={readOnly}
        />
    );
};

// 십자말풀이 컴포넌트
const Crossword = ({ gridSize, onComplete }) => {
    const [grid, setGrid] = useState(initialGrid);

    const handleChange = (row, col, value) => {
        const newGrid = [...grid];
        newGrid[row][col] = value.toUpperCase();
        setGrid(newGrid);

        // 퍼즐 완료 검사
        if (newGrid.flat().every((cell, index) => cell === solutionGrid.flat()[index])) {
            onComplete(true);
        } else {
            onComplete(false);
        }
    };

    if (grid.length === 0) return <div>로딩 중...</div>;

    return (
        <div className="crossword">
            <div className="grid">
                {grid.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={colIndex}
                                value={cell}
                                onChange={(value) => handleChange(rowIndex, colIndex, value)}
                                readOnly={solutionGrid[rowIndex][colIndex] === ""}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
            <div className="hints">
                <h3>가로</h3>
                <ol>
                    {words.slice(0, 6).map((hint, index) => (
                        <li key={index}>{hint.clue}</li>
                    ))}
                </ol>
                <h3>세로</h3>
                <ol>
                    {words.slice(6).map((hint, index) => (
                        <li key={index}>{hint.clue}</li>
                    ))}
                </ol>
            </div>
            <style>{`
                .crossword {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .grid {
                    display: grid;
                    grid-template-rows: repeat(10, 30px);
                    grid-template-columns: repeat(10, 30px);
                    gap: 2px;
                    margin-bottom: 20px;
                }
                .cell {
                    width: 30px;
                    height: 30px;
                    text-align: center;
                }
                .readonly {
                    background-color: #f0f0f0;
                }
                .hints {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }
                .hints h3 {
                    margin: 0;
                    padding: 0;
                }
                .hints ol {
                    padding-left: 20px;
                }
            `}</style>
        </div>
    );
};

// 내측 측두엽 기능진단 테스트 컴포넌트
const Medial = () => {
    const [result, setResult] = useState(null);

    const handleComplete = (isCorrect) => {
        if (isCorrect) {
            setResult("정상");
        } else {
            setResult("비정상");
        }
    };

    return (
        <div>
            <h1>내측 측두엽 기능진단 테스트</h1>
            <Crossword gridSize={10} onComplete={handleComplete} />
            {result && <div>진단 결과: {result}</div>}
        </div>
    );
};

export default Medial;
