import { classes } from "@/lib/helpers/common";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { ChatBubble, EyeEmpty, Lock, Trash, ViewGrid } from "iconoir-react";
import { useRef, useState } from "react";
import ReactMde from "react-mde";
import styled from "styled-components";
import { displayImage } from "../../../lib/helpers/common";
import { getErrorMessage } from "../../../lib/helpers/translateApiErrors";
import useClickOutside from "../../../lib/hooks/useClickOutside";
import { gameService } from "../../../lib/services/game";
import { listService } from "../../../lib/services/list";
import { IGame } from "../../../lib/types/game";
import { EListType, IList } from "../../../lib/types/list";
import Button from "../../Button";
import Input from "../../Input";
import Modal, { useModal } from "../../Modal";
import { useNotification } from "../../Notification";
import { Select, SelectItem } from "../../Select";
import Spinner from "../../Spinner";
import Typography from "../../Typography";

const GameItem = styled(Reorder.Item)`
  transition: background-color var(--transition);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: grab;

  &:hover {
    background-color: var(--gray-150);
  }
`;

export default function Create() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [description, setDescription] = useState("");
  const [games, setGames] = useState<IGame[]>([]);
  const [fetching, setFetching] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedGames, setSelectedGames] = useState<IGame[]>([]);
  const [editingGameId, setEditingGameId] = useState("");
  const { open: setModalOpen, modalOpen, close } = useModal();
  const [list, setList] = useState<IList>();
  const gamesRef = useRef<HTMLDivElement>(null);

  const { add } = useNotification();

  useClickOutside(gamesRef, () => setOpen(false));

  const handleStep = async (step: number) => {
    if (step === 2) {
      setStep(step);
      listService
        .create({
          title,
          type: privacy as EListType,
        })
        .then(({ data: list }) => {
          setList(list);
          setStep(step);
        })
        .catch((err) => {
          add(getErrorMessage(err), "error");
          console.log(err);
        });
    }
  };

  const handleSearch = async (query: string) => {
    setFetching(true);
    setOpen(true);

    if (query.length < 3 || !query || !query.trim()) {
      setFetching(false);
      setOpen(false);

      return;
    }

    const games = await gameService
      .get({
        title: query,
      })
      .catch((err) => {
        setFetching(false);
        setGames([]);
        setOpen(false);
      });

    setGames(
      games?.data.filter(
        (game) => !selectedGames.find((g) => g.id === game.id)
      ) as any
    );
    setFetching(false);
  };

  const handleSubmit = async () => {
    const result = await listService.create({
      title,
      type: privacy as EListType,
      description,
      games: games.map((game) => ({
        gameId: game.id,
        description: "",
      })),
    });

    console.log("result", result);
  };

  const handleAddGame = (game: IGame) => {
    setSelectedGames((prev) => [...prev, game]);
    setOpen(false);
    setGames([]);
  };

  const handleRemoveGame = (game: IGame) => {
    setSelectedGames((prev) => prev.filter((g) => g.id !== game.id));
  };

  const handleReorder = (games: IGame[]) => {
    setSelectedGames(games);
  };

  const handleOpenModal = (game: IGame) => {
    setModalOpen();
    setEditingGameId(game.id);
  };

  const handleSubmitDescription = async () => {
    const result = (await listService
      .update(list?.id as string, {
        games: [
          {
            gameId: editingGameId,
            description,
          },
        ],
      })
      .catch((err) => {
        console.log("err", err);
        setDescription("");
        setEditingGameId("");
      })) as any;

    setDescription("");
    setEditingGameId("");
  };

  if (step === 1) {
    return (
      <div className={`flex flex-col gap-4 relative create-list-container`}>
        <Button onClick={() => add("asd" + Math.random() + Date.now(), "info")}>
          ayo
        </Button>
        {/* <svg
					className="absolute top-2/4 -translate-y-2/4 right-0 -z-10"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          width="100%"
          id="blobSvg"
          // filter="blur(1px)"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(24, 144, 255)"></stop>
              <stop offset="100%" stopColor="rgb(24, 144, 255)"></stop>
            </linearGradient>
          </defs>
          <path id="blob" fill="url(#gradient)">
            <animate
              attributeName="d"
              dur="15100ms"
              repeatCount="indefinite"
              values="M423.38828,307.00416Q406.39243,364.00831,353.55217,384.57202Q300.71191,405.13573,242.06787,430.50416Q183.42382,455.87258,116.5554,425.63666Q49.68697,395.40075,58.87581,322.70037Q68.06464,250,86.66067,197.31625Q105.2567,144.63251,148.86843,108.53648Q192.48015,72.44045,252.10019,66.13989Q311.72022,59.83933,378.54063,84.21929Q445.36105,108.59925,442.87258,179.29963Q440.38412,250,423.38828,307.00416Z;M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z;M437.48517,301.93698Q392.82947,353.87396,357.50371,413.21131Q322.17795,472.54867,247.51112,479.51159Q172.8443,486.47452,129.54819,427.64458Q86.25209,368.81464,81.57785,309.40732Q76.90361,250,83.86283,191.93327Q90.82205,133.86654,141.98146,104.152Q193.14087,74.43745,247.01483,83.88926Q300.88878,93.34106,355.51112,113.62234Q410.13346,133.90361,446.13717,191.95181Q482.14087,250,437.48517,301.93698Z;M469.34657,320.38487Q443.8468,390.76973,373.53877,402.1156Q303.23073,413.46147,238.88463,448.30757Q174.53853,483.15367,122.76833,431.6929Q70.99814,380.23213,76.84563,315.11607Q82.69313,250,78.9227,186.3071Q75.15227,122.6142,131.92223,91.73003Q188.6922,60.84587,253.2305,51.539Q317.7688,42.23213,359.5759,90.92433Q401.383,139.61653,448.11467,194.80827Q494.84633,250,469.34657,320.38487Z;M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z;M439.43806,316.51312Q432.44085,383.02623,370.39398,407.14258Q308.3471,431.25893,240.13979,459.78516Q171.93248,488.31139,132.30301,426.26451Q92.67355,364.21763,63.21484,307.10882Q33.75613,250,44.06194,178.90151Q54.36774,107.80301,118.67355,75.31613Q182.97935,42.82924,240.60882,72.66602Q298.23828,102.50279,368.10882,107.87054Q437.97935,113.23828,442.20731,181.61914Q446.43527,250,439.43806,316.51312Z;M428.88107,298.41731Q382.87896,346.83463,343.6411,381.94757Q304.40324,417.06052,249.73188,417.66327Q195.06052,418.26602,121.90324,407.33463Q48.74595,396.40324,42.90922,323.20162Q37.07249,250,50.04223,182.03624Q63.01197,114.07249,129.2076,98.49191Q195.40324,82.91133,251.0746,78.83673Q306.74595,74.76214,356.50598,105.64321Q406.26602,136.52427,440.5746,193.26214Q474.88318,250,428.88107,298.41731Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M423.38828,307.00416Q406.39243,364.00831,353.55217,384.57202Q300.71191,405.13573,242.06787,430.50416Q183.42382,455.87258,116.5554,425.63666Q49.68697,395.40075,58.87581,322.70037Q68.06464,250,86.66067,197.31625Q105.2567,144.63251,148.86843,108.53648Q192.48015,72.44045,252.10019,66.13989Q311.72022,59.83933,378.54063,84.21929Q445.36105,108.59925,442.87258,179.29963Q440.38412,250,423.38828,307.00416Z"
            ></animate>
          </path>
          <path id="blob" fill="url(#gradient)">
            <animate
              attributeName="d"
              dur="15100ms"
              repeatCount="indefinite"
              values="M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z;M403.5,294Q372,338,343,393Q314,448,254,435.5Q194,423,138,397.5Q82,372,88,311Q94,250,86,187.5Q78,125,134,95.5Q190,66,253,57Q316,48,362,91.5Q408,135,421.5,192.5Q435,250,403.5,294Z;M410.95278,296.31131Q377.83016,342.62262,346.59668,396.40799Q315.3632,450.19336,253.66275,438.70512Q191.9623,427.21687,143.72172,394.79004Q95.48115,362.3632,86.24057,306.1816Q77,250,74.51885,185.3632Q72.0377,120.72639,123.0377,68.91975Q174.0377,17.1131,239.88914,47.47163Q305.74057,77.83016,366.40332,99.75233Q427.06607,121.67451,435.57074,185.83725Q444.0754,250,410.95278,296.31131Z;M453.70516,317.0107Q433.36186,384.02139,362.52423,381.146Q291.6866,378.27061,242.8433,399.93801Q194,421.60541,117.08118,412.14317Q40.16237,402.68093,64.29201,326.34046Q88.42165,250,109.0107,206.32693Q129.59975,162.65387,148.64317,78.76495Q167.6866,-5.12397,241.8433,20.74072Q316,46.60541,350.8433,99.17023Q385.6866,151.73505,429.86753,200.86753Q474.04846,250,453.70516,317.0107Z;M460.19079,314.81752Q429.48296,379.63503,366.74655,397.33779Q304.01014,415.04055,238.62673,450.6401Q173.24331,486.23965,141.80231,418.853Q110.3613,351.46635,87.51337,300.73317Q64.66545,250,86.56406,198.80231Q108.46268,147.60462,149.75669,107.39355Q191.05069,67.18248,258.9189,40.41566Q326.7871,13.64883,381.21107,64.45621Q435.63503,115.26359,463.26683,182.63179Q490.89862,250,460.19079,314.81752Z;M437.48517,301.93698Q392.82947,353.87396,357.50371,413.21131Q322.17795,472.54867,247.51112,479.51159Q172.8443,486.47452,129.54819,427.64458Q86.25209,368.81464,81.57785,309.40732Q76.90361,250,83.86283,191.93327Q90.82205,133.86654,141.98146,104.152Q193.14087,74.43745,247.01483,83.88926Q300.88878,93.34106,355.51112,113.62234Q410.13346,133.90361,446.13717,191.95181Q482.14087,250,437.48517,301.93698Z;M424.84079,321.86371Q447.86386,393.72743,384.56836,431.15935Q321.27286,468.59128,248.86371,472.84107Q176.45457,477.09086,148.84107,410.1135Q121.22757,343.13614,67.95457,296.56807Q14.68157,250,76.45485,209.5685Q138.22813,169.13699,166.2505,123.59142Q194.27286,78.04585,249.70464,79.81828Q305.13643,81.59072,362.47721,103.93179Q419.818,126.27286,410.81786,188.13643Q401.81772,250,424.84079,321.86371Z;M428.88107,298.41731Q382.87896,346.83463,343.6411,381.94757Q304.40324,417.06052,249.73188,417.66327Q195.06052,418.26602,121.90324,407.33463Q48.74595,396.40324,42.90922,323.20162Q37.07249,250,50.04223,182.03624Q63.01197,114.07249,129.2076,98.49191Q195.40324,82.91133,251.0746,78.83673Q306.74595,74.76214,356.50598,105.64321Q406.26602,136.52427,440.5746,193.26214Q474.88318,250,428.88107,298.41731Z;M402.82336,294.74662Q372.52122,339.49324,339.45366,380.77461Q306.3861,422.05598,251.70463,416.9165Q197.02317,411.77702,159.66506,377.28619Q122.30695,342.79537,72.75579,296.39768Q23.20463,250,37.88851,178.24662Q52.57238,106.49324,117.0304,72.97924Q181.48842,39.46525,238.53957,73.79537Q295.59073,108.12549,332.49083,135.50917Q369.39092,162.89286,401.2582,206.44643Q433.12549,250,402.82336,294.74662Z"
            ></animate>
          </path>
        </svg> */}
        <Typography.Title level="3" thickness={3}>
          Create a list
        </Typography.Title>
        <Input
          label="List title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            className={classes("type", privacy === "public" && "type-active")}
            onClick={() => setPrivacy("public")}
          >
            <EyeEmpty width="1.9em" height="1.9em" />
            <Typography>Public</Typography>
          </button>
          <button
            className={classes("type", privacy === "private" && "type-active")}
            onClick={() => setPrivacy("private")}
          >
            <Lock width="1.9em" height="1.9em" />
            <Typography>Private</Typography>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button outlined color="danger" onClick={() => setStep(2)}>
            Cancel
          </Button>
          <Button onClick={() => handleStep(2)}>Create</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Modal className="w-1/3" modalOpen={modalOpen} handleClose={close}>
        <div className="flex flex-col gap-3">
          <Typography.Title className="mb-5" level="4" thickness={3}>
            Write a comment
          </Typography.Title>
          <ReactMde
            toolbarCommands={[
              ["header", "bold", "italic", "strikethrough", "unordered-list"],
            ]}
            disablePreview
            value={description}
            onChange={setDescription}
          />
          <div className="flex items-center justify-end gap-2">
            <Button outlined color="danger">
              Cancel
            </Button>
            <Button onClick={handleSubmitDescription}>Save</Button>
          </div>
        </div>
      </Modal>
      <div className={`flex flex-col gap-5 create-list-container`}>
        <div className="flex items-center justify-between">
          <Typography.Title
            level="3"
            thickness={3}
            className="truncate max-w-md"
          >
            {title}
          </Typography.Title>
          <Button>
            <Typography>Save</Typography>
          </Button>
        </div>
        <Input
          value={title}
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex flex-col gap-1">
          <Typography className="!text-xs uppercase" thickness={3}>
            Description
          </Typography>
          <ReactMde
            toolbarCommands={[
              ["header", "bold", "italic", "strikethrough", "unordered-list"],
            ]}
            disablePreview
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select label="Privacy" onSelect={console.log} value={privacy}>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </Select>
          <Select label="Sort by" onSelect={console.log}>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="alphabetical">Alphabetical (A-Z)</SelectItem>
          </Select>
        </div>
        <div className="relative">
          <Input
            label="Search to add a game"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <AnimatePresence>
            {open && (
              <motion.div
                className={`mt-2`}
                ref={gamesRef}
                // animate={open ? "open" : "closed"}
                // variants={{
                //   open: {
                //     opacity: 1,
                //     y: 0,
                //     transition: {
                //       staggerChildren: 0.1,
                //       delayChildren: 0.1,
                //     },
                //     pointerEvents: "all",
                //   },
                //   closed: {
                //     opacity: 0,
                //     y: 10,
                //     transition: {
                //       staggerChildren: 0.1,
                //       staggerDirection: -1,
                //     },
                //     pointerEvents: "none",
                //   },
                // }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {fetching && <Spinner width="32" height="32" />}
                {!fetching &&
                  games.map((game) => (
                    <motion.div
                      className={`${classes(
                        "flex items-center gap-2",
                        // is first game add top left and right border radius
                        games.indexOf(game) === 0 && "rounded-t-lg",
                        // is last game add bottom left and right border radius
                        games.indexOf(game) === games.length - 1 &&
                          "rounded-b-lg"
                      )}`}
                      key={game.id}
                      onClick={() => handleAddGame(game)}
                    >
                      <img
                        src={displayImage(game.cover)}
                        alt={game.title}
                        className="w-12 h-12 rounded-full"
                      />
                      <Typography thickness={3}>{game.title}</Typography>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          {selectedGames.length > 0 && (
            <Reorder.Group
              className="mt-2"
              axis="y"
              onReorder={handleReorder}
              values={selectedGames}
            >
              {selectedGames.map((game) => (
                <GameItem
                  key={game.id}
                  className="flex items-center"
                  value={game}
                  // style={{ y, boxShadow }}
                >
                  <ViewGrid className="mr-2" />
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <img
                        src={displayImage(game.cover)}
                        alt={game.title}
                        className="w-12 h-12 rounded-full"
                      />
                      <Typography className="w-40" thickness={3} ellipsis>
                        {game.title}
                      </Typography>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenModal(game)}
                      >
                        <ChatBubble />
                      </button>
                      <button onClick={() => handleRemoveGame(game)}>
                        <Trash
                          width="1.5em"
                          height="1.5em"
                          color="var(--red-3)"
                        />
                      </button>
                    </div>
                  </div>
                </GameItem>
              ))}
            </Reorder.Group>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button outlined color="danger">
            <Typography>Cancel</Typography>
          </Button>
          <Button type="submit">
            <Typography>Save</Typography>
          </Button>
        </div>
      </div>
    </form>
  );
}
