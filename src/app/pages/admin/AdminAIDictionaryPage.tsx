import { useState } from 'react';
import { useNavigate } from 'react-router';
import { VintageLayout } from '../../components/VintageLayout';
import { VintageButton } from '../../components/VintageButton';
import { VintageInput } from '../../components/VintageInput';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface DictionaryEntry {
  id: string;
  term: string;
  definition: string;
  category: string;
  dateAdded: Date;
}

const mockDictionary: DictionaryEntry[] = [
  {
    id: '1',
    term: 'Force Majeure',
    definition: 'An unforeseeable circumstance that prevents someone from fulfilling a contract.',
    category: 'Contract Law',
    dateAdded: new Date('2026-03-01'),
  },
  {
    id: '2',
    term: 'Indemnity',
    definition: 'Security or protection against a loss or other financial burden.',
    category: 'Contract Law',
    dateAdded: new Date('2026-03-01'),
  },
  {
    id: '3',
    term: 'Arbitration',
    definition: 'The use of an arbitrator to settle a dispute.',
    category: 'Dispute Resolution',
    dateAdded: new Date('2026-03-01'),
  },
];

export function AdminAIDictionaryPage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(mockDictionary);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DictionaryEntry | null>(null);
  const [formData, setFormData] = useState({
    term: '',
    definition: '',
    category: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = () => {
    if (!formData.term || !formData.definition || !formData.category) {
      toast.error('Please fill in all fields');
      return;
    }

    // TODO: API call to add dictionary entry
    // Example: await fetch('/api/admin/dictionary/add', { method: 'POST', body: JSON.stringify(formData) });

    const newEntry: DictionaryEntry = {
      id: Date.now().toString(),
      term: formData.term,
      definition: formData.definition,
      category: formData.category,
      dateAdded: new Date(),
    };

    setEntries([...entries, newEntry]);
    setFormData({ term: '', definition: '', category: '' });
    setShowAddModal(false);
    toast.success('Dictionary entry added');
  };

  const handleUpdate = () => {
    if (!editingEntry || !formData.term || !formData.definition || !formData.category) {
      toast.error('Please fill in all fields');
      return;
    }

    // TODO: API call to update dictionary entry
    // Example: await fetch('/api/admin/dictionary/update', { method: 'PUT', body: JSON.stringify({ id: editingEntry.id, ...formData }) });

    setEntries(
      entries.map((entry) =>
        entry.id === editingEntry.id
          ? { ...entry, ...formData }
          : entry
      )
    );
    setFormData({ term: '', definition: '', category: '' });
    setEditingEntry(null);
    toast.success('Dictionary entry updated');
  };

  const handleDelete = (id: string) => {
    // TODO: API call to delete dictionary entry
    // Example: await fetch('/api/admin/dictionary/delete', { method: 'DELETE', body: JSON.stringify({ id }) });

    setEntries(entries.filter((entry) => entry.id !== id));
    toast.success('Dictionary entry deleted');
  };

  const handleEdit = (entry: DictionaryEntry) => {
    setEditingEntry(entry);
    setFormData({
      term: entry.term,
      definition: entry.definition,
      category: entry.category,
    });
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <VintageLayout showLogo={false}>
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/admin/home')}
          className="mb-4 text-amber-800 hover:text-amber-900 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-serif">Back</span>
        </button>

        <div className="bg-amber-50/80 border-4 border-amber-800 p-8 shadow-lg">
          <h2 className="text-2xl text-center mb-8 text-amber-900 font-serif tracking-wide">
            Update AI Dictionary
          </h2>

          <div className="mb-6 flex gap-4">
            <VintageInput
              type="text"
              placeholder="Search dictionary..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <VintageButton onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 inline mr-2" />
              Add Entry
            </VintageButton>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-amber-100/50 border-2 border-amber-300 p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg text-amber-900 font-serif">{entry.term}</h3>
                      <span className="text-xs px-2 py-1 bg-amber-200 border border-amber-700 text-amber-900">
                        {entry.category}
                      </span>
                    </div>
                    <p className="text-sm text-amber-800 font-serif leading-relaxed">
                      {entry.definition}
                    </p>
                    <p className="text-xs text-amber-600 font-serif mt-2">
                      Added: {entry.dateAdded.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(entry)}
                      className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-red-700 hover:text-red-900 hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Modal */}
        {(showAddModal || editingEntry) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-amber-50 border-4 border-amber-800 p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl text-amber-900 font-serif mb-4">
                {editingEntry ? 'Edit Entry' : 'Add New Entry'}
              </h3>

              <div className="space-y-4 mb-6">
                <VintageInput
                  label="Term"
                  type="text"
                  placeholder="Legal term"
                  value={formData.term}
                  onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                />

                <div>
                  <label className="block text-sm text-amber-900 mb-2 font-serif">
                    Definition
                  </label>
                  <textarea
                    className="w-full px-4 py-3 bg-amber-50 border-2 border-amber-300 text-amber-900 placeholder:text-amber-500 focus:outline-none focus:border-amber-700 transition-colors min-h-32"
                    placeholder="Definition of the term..."
                    value={formData.definition}
                    onChange={(e) =>
                      setFormData({ ...formData, definition: e.target.value })
                    }
                  />
                </div>

                <VintageInput
                  label="Category"
                  type="text"
                  placeholder="e.g., Contract Law, Corporate Law"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <VintageButton
                  onClick={editingEntry ? handleUpdate : handleAdd}
                  className="flex-1"
                >
                  {editingEntry ? 'Update' : 'Add'}
                </VintageButton>
                <VintageButton
                  variant="secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEntry(null);
                    setFormData({ term: '', definition: '', category: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </VintageButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </VintageLayout>
  );
}
