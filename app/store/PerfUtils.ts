
export class PerfUtils {
    static OBJECTS_COUNT = 6000;

    static generateBigState() {
        const perf = {};
        for(var i = 0; i < this.OBJECTS_COUNT; i++) {
            perf[i] = {i: `${i}`};
        }
        return perf;
    }

}