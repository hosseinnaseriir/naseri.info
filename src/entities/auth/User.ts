import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "@Entities";
import { BillingReport } from "@Entities";

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column({ type: "date", nullable: true })
    dateOfBirth: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;

    @OneToMany(() => Course, course => course.id)
    courses: Course[];

    @OneToMany(() => BillingReport, billingReport => billingReport.id)
    billingReports: BillingReport[];
}