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

const findReach: (player: 'X' | 'O', square: GameResult[]) => number[] = (player, square) => {
    let reaches: number[] = [];
    for (let i=0; i<8; i++) {
        // lineに２つplayerの駒があってかつもう１つがnullならそのiを返す
        // まず打てるか確認
        let candidate: number[] = [];
        let num: number = 0;
        for (let j=0; j<3; j++) {
            const pos: number = lines[i][j];
            if (!square[pos]) candidate = [pos, ...candidate];
            else if (square[pos]===player) num++;
        }
        // 打てるとこがないか、リーチしてなかったら次
        if (candidate.length===0 || num<2) continue;
        else {
            // リーチがあるので防ぐ位置を記録
            reaches = [candidate[0], ...reaches];
        }
    }
    return reaches
}

export default function EnemyPostAttack(square: GameResult[], isWeak: boolean): number | null {
    if (!isWeak){
        // 最強モード
        // 真ん中が空いてたら打つ
        if (!square[4]) {
            return 4;
        }
        console.log('no center');
        // 自分のリーチを検知
        const aiReach = findReach('O', square);
        if (aiReach.length !== 0) return aiReach[0];
        console.log('no my reach');
        // 相手のリーチを検知
        const playerReach = findReach('X', square);
        if (playerReach.length !== 0) return playerReach[0];
        console.log('no your reach');
        // リーチなかったら角に打つ
        const corner: number[] = [0, 2, 6, 8];
        for (let i of corner) {
            if (!square[i]){
                console.log('corner:', i);
                return i;
            }
        }
        console.log('no corner');
        // 角が空いてなかったらテキトーに打つ けどそんな状況はないはず
        // もし打つところがなかったら
        return null;
    } else {
        // 最弱モード
        // 打っちゃダメなところを記録
        // 自分と敵のリーチに打たない
        const aiReachs: number[] = findReach('O', square);
        const playerReachs: number[] = findReach('X', square);
        let banned: number[] = [...aiReachs, ...playerReachs];

        // 角と真ん中以外が空いてたら打つ = 奇数の目
        const odds: number[] = [1, 3, 5, 7]
        for (let pos of odds) {
            if (!square[pos] && !banned.includes(pos)) {
                console.log('odds:', pos);
                return pos;
            }
        }

        // 仕方ないので角と真ん中で、リーチしてないところに打つ
        const evens: number[] = [0, 2, 4, 6, 8]
        for (let pos of evens) {
            if (!square[pos] && !banned.includes(pos)) {
                console.log('evens:', pos);
                return pos;
            }
        }

        // 仕方がないので相手のリーチしてる空いてるところに打つ
        console.log('player reaches:', playerReachs);
        for (let pos of playerReachs) {
            if (!aiReachs.includes(pos)) {
                console.log('player reach prevented...');
                return pos;
            }
        }

        // 最終自分のリーチに打つ
        if (aiReachs.length !== 0) return aiReachs[0];

        return null;
    }
}