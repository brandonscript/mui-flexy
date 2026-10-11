import { FlexBox, FlexRowBox, FlexColumnBox, FlexGrid, FlexyProvider, FlexGrid2 } from "@mui-flexy/v6";
import { runClassModeTests } from "../shared/Flex.classes.test-shared";

runClassModeTests({ FlexBox, FlexRowBox, FlexColumnBox, FlexGrid, FlexyProvider, extraGrid: FlexGrid2 });
