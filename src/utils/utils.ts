export class Utils { 
    public static randomInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}