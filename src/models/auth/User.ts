import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "@/models";
import { BillingReport } from "@/models";
import { Role } from "@/enums";

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

    @Column({ default: Role.User })
    role: string;

    @OneToMany(() => BillingReport, billingReport => billingReport.id)
    billingReports: BillingReport[];
}