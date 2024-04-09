// import { Button, List, Space } from 'antd';

// const SingleRace = ({ race, toggleDrawer, setSelectedRound}) => {

//   return (
//     <List.Item style={{ padding: '10px 0' }}>
//       <List.Item.Meta title={race.name} />
//       <Space>
//         <Button
//           type="primary"
//           size="small"
//           onClick={() => toggleDrawer(1, true)}
//         >
//           Results
//         </Button>
//         <Button
//           type="primary"
//           size="small"
//           onClick={() => {toggleDrawer(2, true); setSelectedRound(race.round);}}
//         >
//           Standings
//         </Button>
//       </Space>
//     </List.Item>
//   );
// };

// export default SingleRace;


// // import { Button, List, Space } from 'antd';

// // const SingleRace = ({ race, toggleDrawer, setSelectedRound, setDriverStandings }) => {

// //   const handleStandingsClick = async () => {
// //     toggleDrawer(2, true);
// //     setSelectedRound(race.round);

// //     const { data, error } = await Supabase.from('driverStandings')
// //       .select('*')
// //       .eq('raceId', race.raceId);
// //     if (error) {
// //       console.error('Error fetching driver standings:', error);
// //       return;
// //     }
// //     setDriverStandings(data);
// //   };

// //   return (
// //     <List.Item style={{ padding: '10px 0' }}>
// //       <List.Item.Meta title={race.name} />
// //       <Space>
// //         <Button
// //           type="primary"
// //           size="small"
// //           onClick={() => toggleDrawer(1, true)}
// //         >
// //           Results
// //         </Button>
// //         <Button
// //           type="primary"
// //           size="small"
// //           onClick={handleStandingsClick}
// //         >
// //           Standings
// //         </Button>
// //       </Space>
// //     </List.Item>
// //   );
// // };

// // export default SingleRace;

import { Button, List, Space, Typography, Flex} from 'antd';
import Layout from 'antd/lib/layout';
import { useEffect, useState } from 'react';
import Supabase from '../../../utility/f1-supabase.js'; //utility folder in src
const { Title } = Typography;
const { Content } = Layout;

const SingleRace = ({ race, toggleDrawer, setStandingsContent, getFav }) => {
    const [driverStandings, setDriverStandings] = useState([]);
    async function selectDriverStandings() {
        console.log('getting from supabase ... here to check if I’ve gone infinite');
        const { data, error } = await Supabase.from('driverStandings')
          .select('*')
          .eq('raceId', race.key);
        if (error) {
          console.error('Error fetching driver standings:', error);
          return;
        }
        setDriverStandings(data);
      }
      useEffect(() => {
        selectDriverStandings();
      }, [race]);

      const driverStandingsData = driverStandings
      .map((driverStanding) => ({
        key: driverStanding.driverStandingsId,
        raceId: driverStanding.raceId,
        driverId: driverStanding.driverId,
        points: driverStanding.points,
        position: driverStanding.position,
        positionText: driverStanding.positionText,
        wins: driverStanding.wins,
      }));

      //////////////


      const [constructorStandings, setConstructorStandings] = useState([]);
      async function selectConstructorStandings() {
          console.log('getting from supabase ... here to check if I’ve gone infinite');
          const { data, error } = await Supabase.from('constructorStandings')
            .select('*')
            .eq('raceId', race.key);
          if (error) {
            console.error('Error fetching constructor standings:', error);
            return;
          }
          setConstructorStandings(data);
        }
        useEffect(() => {
          selectConstructorStandings();
        }, [race]);
  
        const constructorStandingsData = constructorStandings
        .map((constructorStanding) => ({
          key: constructorStanding.constructorStandingsId,
          raceId: constructorStanding.raceId,
          constructorId: constructorStanding.constructorId,
          points: constructorStanding.points,
          position: constructorStanding.position,
          positionText: constructorStanding.positionText,
          wins: constructorStanding.wins,
        }));

        const standingsDrawerContent = (
            <>
              {/* <Button type="primary">Add standings to favorites</Button> */}
              <Title style={{textAlign: 'center'}}>Standings</Title>
              <h3>After round: {race.round}</h3>
              <Flex style={{ flexDirection: 'row' }}>
                      <Content style={{padding: '24px 0', minHeight: 280, justifyContent: 'center', alignItems: 'center' }}>
                          <Title style={{textAlign: 'center'}}>Drivers</Title>
                          <Content width={500}>
                          <List
                                dataSource={driverStandingsData}
                                renderItem={(driverStanding) => (
                                <List.Item>
                                    <List.Item.Meta title={`driverId: ${driverStanding.driverId}`} 
                                                    description={`Points: ${driverStanding.points}` + ` | Wins: ${driverStanding.wins}`} />
                                </List.Item>
                                )}
                            />
                          </Content>
                      </Content>
                      
                      <Content style={{padding: '24px 0', minHeight: 280, justifyContent: 'center', alignItems: 'center'}}>
                          <Title style={{textAlign: 'center'}}>Constructors</Title>
                          <Content width={500}>
                          <List
                                dataSource={constructorStandingsData}
                                renderItem={(constructorStanding) => (
                                <List.Item>
                                    <List.Item.Meta title={`constructorId: ${constructorStanding.constructorId}`} 
                                                    description={`Points: ${constructorStanding.points}` + ` | Wins: ${constructorStanding.wins}`} />
                                </List.Item>
                                )}
                            />
                          </Content>
                      </Content>
              </Flex>
            </>
          );



// console.log('RACE ID: '+race.key);
console.log('DRIVER STANDINGS' + driverStandings)
console.log('DRIVER STANDINGS length' + driverStandings.length)

  return (
    <List.Item style={{ padding: '10px 0' }}>
      <List.Item.Meta title={race.name} />
      <Space>
        <Button onClick={() => getFav(race)}>Favorite</Button>

        <Button
          type="primary"
          size="big"
          shape="round"
          onClick={() => toggleDrawer(1, true)}
        >
          Results
        </Button>
        <Button
          type="primary"
          size="big"
          shape="round"
          onClick={() => {
            toggleDrawer(2, true);
            setStandingsContent(standingsDrawerContent);
          }}
        >
          Standings
        </Button>
      </Space>
    </List.Item>
  );
};

export default SingleRace;
