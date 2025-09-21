export interface Supply {
  id?: number;
  achievementDetails?: string; //成果详情
  achievementName?: string; //成果名称
  achievementOverview?: string; //成果概述
  achievementProofMaterials?: string; //成果证明材料
  achievementUnit?: string; //成果单位
  contactPhone?: string; //联系电话
  coreCompetitiveness?: string; //核心核心竞争力
  createTime?: string; //创建时间
  field?: string; //所属领域
  intellectualPropertyForm?: string; //知识产权形式
  intendedTransformationForm?: string; //拟转化形式
  otherNotes?: string; //其他说明
  responsiblePerson?: string; //负责人姓名
  technicalFeatures?: string; //技术特点
  transformationConditions?: string; //转化所需条件
  updateTime?: string; //更新时间
  serialNumber?: string; //序号
}

export interface SupplyOptions {
  name?: string;
  field?: string;
  page?: number;
  size?: number;
}

export interface SupplyConfig {
  id?: number;
  configName?: string;
  visibleFields: string;
}
