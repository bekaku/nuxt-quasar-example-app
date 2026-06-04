export class Snowflake {
    // Bit lengths
    private readonly workerIdBits = 5n;
    private readonly datacenterIdBits = 5n;
    private readonly sequenceBits = 12n;

    // Max values
    private readonly maxWorkerId = -1n ^ (-1n << this.workerIdBits); // 31
    private readonly maxDatacenterId = -1n ^ (-1n << this.datacenterIdBits); // 31
    private readonly sequenceMask = -1n ^ (-1n << this.sequenceBits); // 4095

    // Shifts
    private readonly workerIdShift = this.sequenceBits; // 12
    private readonly datacenterIdShift = this.sequenceBits + this.workerIdBits; // 17
    private readonly timestampLeftShift = this.sequenceBits + this.workerIdBits + this.datacenterIdBits; // 22

    // State
    private datacenterId: bigint;
    private workerId: bigint;
    private epoch: bigint;
    private sequence: bigint = 0n;
    private lastTimestamp: bigint = -1n;

    /* How to Use It
    // Initialize the generator
    // (Datacenter 1, Worker 1, using default Twitter Epoch)
    const idGenerator = new Snowflake(1, 1);

    // Generate an ID
    const newId = idGenerator.nextId();
    */

    /**
     * @param datacenterId - A 5-bit ID (0-31)
     * @param workerId - A 5-bit ID (0-31)
     * @param epoch - Custom epoch in milliseconds (defaults to Twitter epoch: Nov 04 2010)
     */
    constructor(datacenterId: number, workerId: number, epoch: number = 1288834974657) {
        this.datacenterId = BigInt(datacenterId);
        this.workerId = BigInt(workerId);
        this.epoch = BigInt(epoch);

        if (this.datacenterId > this.maxDatacenterId || this.datacenterId < 0n) {
            throw new Error(`Datacenter ID must be between 0 and ${this.maxDatacenterId}`);
        }
        if (this.workerId > this.maxWorkerId || this.workerId < 0n) {
            throw new Error(`Worker ID must be between 0 and ${this.maxWorkerId}`);
        }
    }

    /**
     * Generates the next unique Snowflake ID.
     * @returns A 64-bit ID as a string (to prevent JS Number precision loss).
     */
    public nextId(): string {
        let timestamp = this.currentTime();

        if (timestamp < this.lastTimestamp) {
            throw new Error('Clock moved backwards. Refusing to generate id');
        }

        if (timestamp === this.lastTimestamp) {
            // Increment sequence and mask it to prevent overflow
            this.sequence = (this.sequence + 1n) & this.sequenceMask;

            // If sequence rolls over to 0, wait for the next millisecond
            if (this.sequence === 0n) {
                timestamp = this.waitNextMillis(this.lastTimestamp);
            }
        } else {
            // Reset sequence for the new millisecond
            this.sequence = 0n;
        }

        this.lastTimestamp = timestamp;

        // Assemble the 64-bit ID
        const id =
            ((timestamp - this.epoch) << this.timestampLeftShift) |
            (this.datacenterId << this.datacenterIdShift) |
            (this.workerId << this.workerIdShift) |
            this.sequence;

        // Return as string for safe JSON serialization and transmission
        return id.toString();
    }

    private currentTime(): bigint {
        return BigInt(Date.now());
    }

    private waitNextMillis(lastTimestamp: bigint): bigint {
        let timestamp = this.currentTime();
        while (timestamp <= lastTimestamp) {
            timestamp = this.currentTime();
        }
        return timestamp;
    }
}