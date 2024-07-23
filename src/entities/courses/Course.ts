import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "courses"
})
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;
    
    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;
}
