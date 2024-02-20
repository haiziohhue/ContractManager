import { Like } from "typeorm";
import { AppDataSource } from "../../utils/data-source";
import { EntityContract } from "../ContractModule/contract.entity";
import {config} from "../../utils/config";
import {Token} from "../../utils/token";

const connection = AppDataSource.getRepository(EntityContract);
export const login = (ctx) => {
  const { password } = ctx.request.body;
  if (password === config.loginPassword) {
    const token = Token.create(password);
    ctx.body = {
      code: 0,
      msg: "登录成功",
      data: {
        token,
      },
    };
  } else {
    ctx.body = {
      code: 1,
      msg: "登录失败",
      data: {},
    };
  }
};
export const upload = async (ctx) => {
  const files = ctx.request.files;
  const { title, keyword,contractDate,firstCompany,secondCompany } = ctx.request.body;
  const contract = new EntityContract();
  try{
    const { img, pdf } = files;
    if(img){
      contract.coverImgName = img.newFilename ?? null;
      contract.coverImgPath = img.filepath ?? null;
    }
    if(pdf){
      contract.contractPdfName = pdf.newFilename ?? null;
      contract.contractPdfPath = pdf.filepath ?? null;
    }
  }catch{}


  contract.title = title ?? null;
  contract.keyword = keyword ?? null;
  contract.contractDate = contractDate ?? null;
  contract.firstCompany = firstCompany ?? null;
  contract.secondCompany = secondCompany ?? null;

  contract.createTime = new Date().toString();
  contract.totalText = `
  ${title??""}
  ${keyword??""}
  ${contractDate??""}
  ${firstCompany??""}
  ${secondCompany??""}
  ${contract.contractPdfName??""}
  ${contract.coverImgName??""}
  `;

  const res = await connection.save(contract);

  ctx.body = {
    code: 0,
    data: res,
    msg: "上传成功",
  };
};
export const getList = async (ctx) => {
  const { context } = ctx.query;
  const connection =await AppDataSource.getRepository(EntityContract);
  const res =await  connection.createQueryBuilder("contract").where({
    totalText: context ? Like(`%${context}%`) : Like("%%"),
  }).getMany();
  ctx.body = { data: res, code: 0, msg: "获取成功" };
};
export const deleteById = async (ctx) => {
  try {
    await connection.delete(ctx.params.id);
    ctx.body = { code: 0, msg: "删除成功" };
  } catch {
    ctx.body = { code: 1, msg: "删除失败" };
  }
};
