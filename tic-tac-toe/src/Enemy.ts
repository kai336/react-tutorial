// 後攻の最強ai
export default function EnemyPostAttack(square: (string | null)[]): number {
    // 真ん中が空いてたら打つ
    if (!square[4]) {
        return 4;
    }
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
    // 相手のリーチを検知
    let isReached: boolean = false;
    for (let i=0; i<9; i++) {
        // lineに２つ'X'があってかつもう１つがnullならそのiを返す
        // まず打てるか確認
        let candidate: number[] = [];
        let xNum: number = 0;
        for (let j=0; j<3; j++) {
            let pos: number = lines[i][j];
            if (!square[pos]) [square[pos], ...candidate];
            else if (square[pos]==='X') xNum++;
        }
        // 打てるとこがないか、リーチしてなかったら次
        if (candidate.length===0 || xNum<2) continue;
        else {
            // リーチがあるので防ぐ位置を返す
            return candidate[0];
        }
    }
    if (!isReached) {
        // リーチなかったら角に打つ
        const corner: number[] = [0, 2, 6, 8];
        for (let i of corner) {
            return i;
        }
    }

    // もし打つところがなかったら
    return -1;
}