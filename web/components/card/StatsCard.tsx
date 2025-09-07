import { Card, Progress, Button } from "antd";
import {
  EyeOutlined,
  MessageOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { statCards } from "@/constants/layoutContant";

const iconMap = {
  eye: <EyeOutlined className="text-primary text-xl" />,
  message: <MessageOutlined className="text-primary text-xl" />,
};

const StateCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((card, idx) => (
        <Card
          key={idx}
          className="shadow-sm hover:shadow-md transition-shadow"
          title={
            <span className="text-lg font-medium text-gray-700">
              {card.title}
            </span>
          }
        >
          <div className="pt-2">
            {card.type === "progress" ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {card.description}
                  </span>
                  <span className="text-sm font-medium">{card.value}%</span>
                </div>
                <Progress
                  percent={card.value}
                  showInfo={false}
                  strokeColor="#800000"
                />
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {iconMap[card.icon as keyof typeof iconMap] ?? null}
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {card.value}{" "}
                    {card.subValue && (
                      <span className="text-sm text-primary font-normal">
                        {card.subValue}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
              </div>
            )}

            <div className="mt-4">
              <Button type="link" className="text-primary p-0 h-auto">
                {card.actionText} <ArrowRightOutlined className="ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StateCard;
