namespace IIIFComponents.AVComponentUtils {
    export class Utils {

        private static _compare(a: any, b: any): string[] {
            const changed: string[] = [];
            Object.keys(a).forEach((p) => {
                if (!Object.is(b[p], a[p])) {
                    changed.push(p);
                }
            });
            return changed;
        }
        
        public static diff(a: any, b: any) {
            return Array.from(new Set(Utils._compare(a, b).concat(Utils._compare(b, a))));
        }

        public static getSpatialComponent(target: string): number[] | null {
            const spatial: RegExpExecArray | null = /xywh=([^&]+)/g.exec(target);
            let xywh: number[] | null = null;

            if (spatial && spatial[1]) {
                xywh = <any>spatial[1].split(',');
            }

            return xywh;
        }

        public static getTemporalComponent(target: string): number[] | null {
            const temporal: RegExpExecArray | null = /t=([^&]+)/g.exec(target);
            let t: number[] | null = null;

            if (temporal && temporal[1]) {
                t = <any>temporal[1].split(',');
            }

            return t;
        }

        public static formatTime(aNumber: number): string {

            let hours: number | string, minutes: number | string, seconds: number | string, hourValue: string;

            seconds 	= Math.ceil(aNumber);
            hours 		= Math.floor(seconds / (60 * 60));
            hours 		= (hours >= 10) ? hours : '0' + hours;
            minutes 	= Math.floor(seconds % (60*60) / 60);
            minutes 	= (minutes >= 10) ? minutes : '0' + minutes;
            seconds 	= Math.floor(seconds % (60*60) % 60);
            seconds 	= (seconds >= 10) ? seconds : '0' + seconds;

            if (hours >= 1) {
                hourValue = hours + ':';
            } else {
                hourValue = '';
            }

            return hourValue + minutes + ':' + seconds;
        }

    }
}