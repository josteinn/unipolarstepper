


namespace stepper {

    let stpWave = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    let stpFull = [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1];

    export class Motor {

        private input1: DigitalPin;
        private input2: DigitalPin;
        private input3: DigitalPin;
        private input4: DigitalPin;
        private delay: number;

        setPins(in1: DigitalPin, in2: DigitalPin, in3: DigitalPin, in4: DigitalPin): void {
            this.input1 = in1;
            this.input2 = in2;
            this.input3 = in3;
            this.input4 = in4;
        }

        //% blockId=runAntiClockwise block="run %motor|%steps|steps anti-clockwise"
        //% weight=85 blockGap=8
        //% steps.defl=100
        runAntiClockWise(steps: number) {
            let j = 0;
            for (let i = 0; i < steps; i++) {

                pins.digitalWritePin(this.input1, stpWave[j]);
                pins.digitalWritePin(this.input2, stpWave[++j]);
                pins.digitalWritePin(this.input3, stpWave[++j]);
                pins.digitalWritePin(this.input4, stpWave[++j]);
                ++j;
                if (j > 15) { j = 0 }
                basic.pause(this.delay);
            }
        }

        //% blockId=runClockwise block="run %motor|%steps|steps clockwise"
        //% weight=85 blockGap=8
        //% steps.defl=100
        runClockWise(steps: number) {
            let j = 15;
            for (let i = 0; i < steps; i++) {

                pins.digitalWritePin(this.input1, stpWave[j]);
                pins.digitalWritePin(this.input2, stpWave[--j]);
                pins.digitalWritePin(this.input3, stpWave[--j]);
                pins.digitalWritePin(this.input4, stpWave[--j]);
                --j;
                if (j < 0) { j = 15 }
                basic.pause(this.delay);
            }
        }

        //% blockId=set_motor_calibration block="%motor|set delay between steps to %delayNum|ms"
        //% weight=60 blockGap=8 
        //% delayNum.defl=2     
        setDelay(delayNum: number): void {
            this.delay = delayNum;
        }

        //% blockId=stopMotor block="stop %motor"
        //% weight=70 blockGap=8
        stopMotor(): void {
            pins.digitalWritePin(this.input1, 0);
            pins.digitalWritePin(this.input2, 0);
            pins.digitalWritePin(this.input3, 0);
            pins.digitalWritePin(this.input4, 0);
        }
    }

    //% blockId="stepperMotor_setMotor" block="in1 %in1|in2 %in2|in3 %in3|in4 %in4"
    //% in1.defl=DigitalPin.P0
    //% in2.defl=DigitalPin.P1
    //% in3.defl=DigitalPin.P2
    //% in4.defl=DigitalPin.P8
    //% weight=90 blockGap=8
    //% parts="motor"
    //% blockSetVariable=motor
    export function createMotor(in1: DigitalPin, in2: DigitalPin, in3: DigitalPin, in4: DigitalPin): Motor {
        let motor = new Motor();
        motor.setPins(in1, in2, in3, in4);
        motor.setDelay(2);
        return motor;
    }

}
