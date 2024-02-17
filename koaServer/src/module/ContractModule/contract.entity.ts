const{ Entity, PrimaryGeneratedColumn, Column } =require("typeorm");

@Entity('contract')
export class EntityContract {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title?: string;
  @Column({ nullable: true })
  keyword?: string;
  @Column({ nullable: true })
  firstCompany?: string;
  @Column({ nullable: true })
  secondCompany?: string;
  @Column({ nullable: true })
  contractDate?: Date;
  @Column({ nullable: true })
  coverImgName?: string;
  @Column({ nullable: true })
  contractPdfName?: string;
  @Column({ nullable: true })
  coverImgPath?: string;
  @Column({ nullable: true })
  contractPdfPath?: string;
  @Column()
  createTime: string;
  @Column()
  totalText:string;
}