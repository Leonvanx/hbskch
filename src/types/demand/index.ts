export interface Demand {
  id?: number;
  academicAchievements?: string; //学术成就
  birthDate?: string; //出生年月
  createTime?: string;
  degree?: string; //	学位
  department?: string; //工作部门
  domainDetail?: string; //领域细分
  email?: string; //邮箱
  ethnic?: string; //民族
  fields?: string; //从事领域
  gender?: string; //性别
  graduateSchool?: string; //毕业院校
  idCard?: string; //身份证
  keywords?: string; //关键词
  major?: string; //所学专业
  mobilePhone?: string; //移动电话
  name?: string; //姓名
  number?: string; //编号
  officePhone?: string; //	办公电话
  originalUnit?: string; //（原）所在单位
  politicalStatus?: string; //面貌
  position?: string; //职务
  title?: string; //	职称
  unitAddress?: string; //单位地址
  unitNature?: string; //	单位性质
  updateTime?: string;
  index?: number;
}

export interface DemandOptions {
  name?: string;
  cardId?: string;
  fields?: string;
  page?: number;
  size?: number;
}

export interface DemandConfig {
  id?: number;
  configName?: string;
  visibleFields: string;
}
