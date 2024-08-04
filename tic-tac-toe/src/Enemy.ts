import { GameResult } from "./types";

const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// 後攻の最強ai

const findReach: (player: 'X' | 'O', square: GameResult[]) => number | null = (player, square) => {
    for (let i=0; i<8; i++) {
        // lineに２つplayerの駒があってかつもう１つがnullならそのiを返す
        // まず打てるか確認
        let candidate: number[] = [];
        let xNum: number = 0;
        for (let j=0; j<3; j++) {
            const pos: number = lines[i][j];
            console.log(square[pos]);
            if (!square[pos]) candidate = [pos, ...candidate];
            else if (square[pos]===player) xNum++;
        }
        console.log(xNum, candidate);
        // 打てるとこがないか、リーチしてなかったら次
        if (candidate.length===0 || xNum<2) continue;
        else {
            // リーチがあるので防ぐ位置を返す
            return candidate[0];
        }
    }
    return null
}

export default function EnemyPostAttack(square: GameResult[]): number | null {
    //console.log(square);
    // 真ん中が空いてたら打つ
    if (!square[4]) {
        return 4;
    }
    // 自分のリーチを検知
    const aiReach = findReach('O', square);
    if (aiReach) return aiReach;
    // 相手のリーチを検知
    const playerReach = findReach('X', square);
    if (playerReach) return playerReach;
    // リーチなかったら角に打つ
    const corner: number[] = [0, 2, 6, 8];
    for (let i of corner) {
        if (!square[i]) return i;
    }
    // もし打つところがなかったら
    return null;
}