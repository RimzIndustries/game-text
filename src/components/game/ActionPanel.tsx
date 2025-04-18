import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Building,
  Sword,
  Coins,
  Users,
  Shield,
  Castle,
  Map,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface ActionPanelProps {
  onActionSelect?: (
    action: "resources" | "building" | "military" | "alliance" | "combat",
  ) => void;
}

const ActionPanel = ({ onActionSelect }: ActionPanelProps) => {
  const navigate = useNavigate();
  const actions = [
    {
      id: "resources",
      name: "Resource Management",
      description: "Manage your kingdom's gold, food, and production",
      icon: <Coins className="h-6 w-6 text-amber-500" />,
      iconBg: "bg-amber-500/10",
      path: "/resources",
    },
    {
      id: "building",
      name: "Building",
      description: "Construct and upgrade buildings in your kingdom",
      icon: <Building className="h-6 w-6 text-emerald-500" />,
      iconBg: "bg-emerald-500/10",
      path: "/building",
    },
    {
      id: "military",
      name: "Military",
      description: "Train and manage your army",
      icon: <Sword className="h-6 w-6 text-red-500" />,
      iconBg: "bg-red-500/10",
      path: "/military",
    },
    {
      id: "alliance",
      name: "Dewan Raja",
      description: "Communicate with your alliance members",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      iconBg: "bg-blue-500/10",
      path: "/alliance",
    },
    {
      id: "combat",
      name: "Combat",
      description: "Plan attacks and espionage missions",
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      iconBg: "bg-purple-500/10",
      path: "/combat",
    },
    {
      id: "kingdom",
      name: "Kingdom Overview",
      description: "View your kingdom's overall status and progress",
      icon: <Castle className="h-6 w-6 text-indigo-500" />,
      iconBg: "bg-indigo-500/10",
      path: "/kingdom",
    },
    {
      id: "map",
      name: "World Map",
      description: "Explore territories and scout enemy kingdoms",
      icon: <Map className="h-6 w-6 text-teal-500" />,
      iconBg: "bg-teal-500/10",
      path: "/map",
    },
  ];

  return (
    <Card className="w-full bg-neuro-bg shadow-neuro-flat-lg hover:shadow-neuro-convex-lg transition-all duration-500">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary/80 via-amber-500 to-primary animate-gradient">
          Kingdom Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TooltipProvider>
            {actions.map((action) => (
              <Tooltip key={action.id}>
                <TooltipTrigger asChild>
                  <Link to={action.path} className="w-full">
                    <Button
                      variant="neuro"
                      className="h-24 w-full flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:shadow-neuro-pressed active:shadow-neuro-pressed group neuro-hover neuro-active neuro-glow relative overflow-hidden"
                      onClick={() => {
                        if (onActionSelect) {
                          onActionSelect(action.id as any);
                        } else {
                          navigate(action.path);
                        }
                      }}
                    >
                      <div
                        className={`p-2 rounded-full ${action.iconBg} transition-all duration-300 group-hover:scale-110 z-10`}
                      >
                        {action.icon}
                      </div>
                      <span className="font-medium z-10">{action.name}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="bg-neuro-bg shadow-neuro-flat border-none">
                  <p>{action.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionPanel;
