import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HANDS = [
  ['AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'],
  ['AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s'],
  ['AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s'],
  ['AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s'],
  ['ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s'],
  ['A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s', '95s', '94s', '93s', '92s'],
  ['A8o', 'K8o', 'Q8o', 'J8o', 'T8o', '98o', '88', '87s', '86s', '85s', '84s', '83s', '82s'],
  ['A7o', 'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '77', '76s', '75s', '74s', '73s', '72s'],
  ['A6o', 'K6o', 'Q6o', 'J6o', 'T6o', '96o', '86o', '76o', '66', '65s', '64s', '63s', '62s'],
  ['A5o', 'K5o', 'Q5o', 'J5o', 'T5o', '95o', '85o', '75o', '65o', '55', '54s', '53s', '52s'],
  ['A4o', 'K4o', 'Q4o', 'J4o', 'T4o', '94o', '84o', '74o', '64o', '54o', '44', '43s', '42s'],
  ['A3o', 'K3o', 'Q3o', 'J3o', 'T3o', '93o', '83o', '73o', '63o', '53o', '43o', '33', '32s'],
  ['A2o', 'K2o', 'Q2o', 'J2o', 'T2o', '92o', '82o', '72o', '62o', '52o', '42o', '32o', '22'],
];

const POSITIONS = [
  { id: 'ep', name: 'EP', color: 'bg-red-500/20 border-red-500/50 text-red-400' },
  { id: 'mp', name: 'MP', color: 'bg-orange-500/20 border-orange-500/50 text-orange-400' },
  { id: 'co', name: 'CO', color: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' },
  { id: 'bu', name: 'BU', color: 'bg-green-500/20 border-green-500/50 text-green-400' },
  { id: 'sb', name: 'SB', color: 'bg-blue-500/20 border-blue-500/50 text-blue-400' },
  { id: 'bb', name: 'BB', color: 'bg-purple-500/20 border-purple-500/50 text-purple-400' },
];

const OPEN_SIZES = ['50bb', '150bb', '200bb', 'HU'];

const SAMPLE_RANGES = {
  ep: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', 'AKs', 'AQs', 'AJs', 'AKo', 'AQo'],
  mp: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', 'AKs', 'AQs', 'AJs', 'ATs', 'KQs', 'AKo', 'AQo', 'AJo'],
  co: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'KQs', 'KJs', 'QJs', 'AKo', 'AQo', 'AJo', 'KQo'],
  bu: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A5s', 'A4s', 'KQs', 'KJs', 'KTs', 'QJs', 'QTs', 'JTs', 'T9s', '98s', 'AKo', 'AQo', 'AJo', 'ATo', 'KQo', 'KJo'],
  sb: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'KQs', 'KJs', 'QJs', 'AKo', 'AQo', 'AJo'],
  bb: ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', 'AKs', 'AQs', 'AJs', 'ATs', 'KQs', 'AKo'],
};

export default function Index() {
  const [selectedPosition, setSelectedPosition] = useState('bu');
  const [selectedOpenSize, setSelectedOpenSize] = useState('50bb');
  const [activeTab, setActiveTab] = useState('ranges');

  const currentRange = SAMPLE_RANGES[selectedPosition as keyof typeof SAMPLE_RANGES] || [];
  const rangePercentage = ((currentRange.length / 169) * 100).toFixed(1);

  const isInRange = (hand: string) => currentRange.includes(hand);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a] to-[#0d2818] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2ecc71] to-[#3498db] bg-clip-text text-transparent mb-2">
            POKER RANGE TRACKER
          </h1>
          <p className="text-muted-foreground">Профессиональный инструмент для анализа покерных ренджей</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="ranges" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Layout" className="mr-2 h-4 w-4" />
              Ренджи
            </TabsTrigger>
            <TabsTrigger value="positions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Users" className="mr-2 h-4 w-4" />
              Позиции
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Settings" className="mr-2 h-4 w-4" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ranges" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 p-6 bg-card/80 backdrop-blur border-border animate-scale-in">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">Матрица рук</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedPosition.toUpperCase()} | {selectedOpenSize} | {rangePercentage}% диапазон
                    </p>
                  </div>
                  <Badge variant="outline" className="text-lg px-4 py-2 border-primary text-primary">
                    {currentRange.length} рук
                  </Badge>
                </div>

                <div className="grid grid-cols-13 gap-1">
                  {HANDS.map((row, rowIndex) =>
                    row.map((hand, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`
                          aspect-square flex items-center justify-center text-xs font-bold rounded transition-all duration-200
                          ${
                            isInRange(hand)
                              ? 'bg-gradient-to-br from-[#2ecc71] to-[#27ae60] text-white shadow-lg shadow-primary/20 scale-105'
                              : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                          }
                          hover:scale-110 cursor-pointer border border-border/50
                        `}
                      >
                        {hand}
                      </div>
                    ))
                  )}
                </div>
              </Card>

              <div className="space-y-4">
                <Card className="p-6 bg-card/80 backdrop-blur border-border animate-fade-in">
                  <h3 className="font-bold mb-4 flex items-center text-primary">
                    <Icon name="MapPin" className="mr-2 h-5 w-5" />
                    Позиция
                  </h3>
                  <div className="space-y-2">
                    {POSITIONS.map((pos) => (
                      <Button
                        key={pos.id}
                        onClick={() => setSelectedPosition(pos.id)}
                        variant={selectedPosition === pos.id ? 'default' : 'outline'}
                        className={`w-full justify-start ${
                          selectedPosition === pos.id
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                            : 'hover:bg-secondary'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full mr-3 ${pos.color.split(' ')[0]}`}></span>
                        {pos.name}
                      </Button>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-card/80 backdrop-blur border-border animate-fade-in">
                  <h3 className="font-bold mb-4 flex items-center text-primary">
                    <Icon name="Filter" className="mr-2 h-5 w-5" />
                    Размер открытия
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {OPEN_SIZES.map((size) => (
                      <Button
                        key={size}
                        onClick={() => setSelectedOpenSize(size)}
                        variant={selectedOpenSize === size ? 'default' : 'outline'}
                        className={
                          selectedOpenSize === size
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                        }
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-card/80 backdrop-blur border-primary/50 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-primary">Диапазон</h3>
                    <Icon name="PieChart" className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{rangePercentage}%</div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#2ecc71] to-[#3498db] h-full rounded-full transition-all duration-500"
                      style={{ width: `${rangePercentage}%` }}
                    ></div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {POSITIONS.map((pos) => {
                const posRange = SAMPLE_RANGES[pos.id as keyof typeof SAMPLE_RANGES] || [];
                const posPercentage = ((posRange.length / 169) * 100).toFixed(1);
                
                return (
                  <Card key={pos.id} className="p-6 bg-card/80 backdrop-blur border-border hover:border-primary/50 transition-all animate-scale-in">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${pos.color}`}>
                          <span className="text-xl font-bold">{pos.name}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{pos.name}</h3>
                          <p className="text-sm text-muted-foreground">{posRange.length} рук</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-primary text-primary">
                        {posPercentage}%
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {posRange.slice(0, 15).map((hand) => (
                        <span key={hand} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          {hand}
                        </span>
                      ))}
                      {posRange.length > 15 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{posRange.length - 15}
                        </span>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur border-border">
              <h2 className="text-2xl font-bold mb-6 text-primary">Настройки</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-3 flex items-center">
                    <Icon name="Palette" className="mr-2 h-5 w-5 text-primary" />
                    Тема интерфейса
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">Темная тема активна</p>
                  <Button variant="outline" disabled className="w-full md:w-auto">
                    Скоро появятся новые темы
                  </Button>
                </div>

                <div>
                  <h3 className="font-bold mb-3 flex items-center">
                    <Icon name="Download" className="mr-2 h-5 w-5 text-primary" />
                    Экспорт данных
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">Экспортируйте ваши ренджи в различных форматах</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="hover:bg-secondary">
                      <Icon name="FileText" className="mr-2 h-4 w-4" />
                      CSV
                    </Button>
                    <Button variant="outline" className="hover:bg-secondary">
                      <Icon name="FileJson" className="mr-2 h-4 w-4" />
                      JSON
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3 flex items-center">
                    <Icon name="Info" className="mr-2 h-5 w-5 text-primary" />
                    О приложении
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Версия 1.0.0 | Профессиональный инструмент для изучения покерных ренджей
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}