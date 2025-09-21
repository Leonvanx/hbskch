export interface Demand {
  id?: number;
  contactPerson?: string; //联系人
  contactPhone?: string; //联系电话
  createTime?: string; //创建时间
  demandDetails?: string; //需求详情
  demandName?: string; //需求名称
  demandOverview?: string; //需求概述
  demandTime?: string; //需求时间
  demandUnit?: string; //需求单位
  email?: string; //邮箱
  expectedEffect?: string; //预期效果
  expectedInvestment?: string; //预期投资
  field?: string; //所属领域
  isDeleted?: number; //是否删除
  remarks?: string; //备注
  serialNumber?: string; //序号
  technicalParameters?: string; //技术参数
  updateTime?: string; //更新时间
  index?: number;
}

export interface DemandOptions {
  name?: string; // 需求名称
  field?: string; // 所属领域
  page?: number;
  size?: number;
}

export interface DemandConfig {
  id?: number;
  configName?: string;
  visibleFields: string;
}
